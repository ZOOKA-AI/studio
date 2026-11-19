/**
 * Firestore Validation Middleware
 * 
 * Provides validation utilities for Firestore operations to ensure data integrity
 * before writing to the database.
 */

import * as React from 'react';
import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  DocumentReference,
  Firestore,
} from 'firebase/firestore';
import { z } from 'zod';
import { validateData, safeValidateData, getValidationErrors } from './validation-schemas';

/**
 * Error thrown when validation fails
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: Record<string, string>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Add a validated document to a collection
 * 
 * @param db Firestore instance
 * @param collectionPath Collection path
 * @param schema Zod schema for validation
 * @param data Data to add
 * @returns Document reference
 * @throws ValidationError if validation fails
 * 
 * @example
 * const userRef = await addValidatedDoc(
 *   db,
 *   'users',
 *   UserInputSchema,
 *   { name: 'John', email: 'john@example.com', role: 'worker' }
 * );
 */
export async function addValidatedDoc<T>(
  db: Firestore,
  collectionPath: string,
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<DocumentReference> {
  // Validate the data
  const result = safeValidateData(schema, data);
  
  if (!result.success) {
    const errors = getValidationErrors(result.error);
    throw new ValidationError('Validation failed', errors);
  }

  const validatedData = result.data;

  // Add timestamps
  const dataWithTimestamps = {
    ...validatedData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  // Add to Firestore
  const collectionRef = collection(db, collectionPath);
  return addDoc(collectionRef, dataWithTimestamps);
}

/**
 * Set a validated document (with specific ID)
 * 
 * @param db Firestore instance
 * @param collectionPath Collection path
 * @param docId Document ID
 * @param schema Zod schema for validation
 * @param data Data to set
 * @param merge Whether to merge with existing data
 * @throws ValidationError if validation fails
 * 
 * @example
 * await setValidatedDoc(
 *   db,
 *   'users',
 *   'user123',
 *   UserInputSchema,
 *   { name: 'John', email: 'john@example.com', role: 'worker' }
 * );
 */
export async function setValidatedDoc<T>(
  db: Firestore,
  collectionPath: string,
  docId: string,
  schema: z.ZodSchema<T>,
  data: unknown,
  merge: boolean = false
): Promise<void> {
  // Validate the data
  const result = safeValidateData(schema, data);
  
  if (!result.success) {
    const errors = getValidationErrors(result.error);
    throw new ValidationError('Validation failed', errors);
  }

  const validatedData = result.data;

  // Add timestamps
  const dataWithTimestamps = {
    ...validatedData,
    ...(merge ? {} : { createdAt: serverTimestamp() }),
    updatedAt: serverTimestamp(),
  };

  // Set in Firestore
  const docRef = doc(db, collectionPath, docId);
  await setDoc(docRef, dataWithTimestamps, { merge });
}

/**
 * Update a validated document (partial updates allowed)
 * 
 * @param db Firestore instance
 * @param collectionPath Collection path
 * @param docId Document ID
 * @param schema Zod schema for validation (use partial schema for updates)
 * @param data Data to update
 * @throws ValidationError if validation fails
 * 
 * @example
 * await updateValidatedDoc(
 *   db,
 *   'users',
 *   'user123',
 *   UserInputSchema.partial(),
 *   { name: 'John Updated' }
 * );
 */
export async function updateValidatedDoc<T>(
  db: Firestore,
  collectionPath: string,
  docId: string,
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<void> {
  // Validate the data
  const result = safeValidateData(schema, data);
  
  if (!result.success) {
    const errors = getValidationErrors(result.error);
    throw new ValidationError('Validation failed', errors);
  }

  const validatedData = result.data;

  // Add updated timestamp
  const dataWithTimestamp = {
    ...validatedData,
    updatedAt: serverTimestamp(),
  };

  // Update in Firestore
  const docRef = doc(db, collectionPath, docId);
  await updateDoc(docRef, dataWithTimestamp);
}

/**
 * Validate data without writing to Firestore
 * Useful for form validation before submission
 * 
 * @param schema Zod schema
 * @param data Data to validate
 * @returns Validated data
 * @throws ValidationError if validation fails
 * 
 * @example
 * try {
 *   const validData = validateOnly(UserInputSchema, formData);
 *   // Proceed with submission
 * } catch (error) {
 *   if (error instanceof ValidationError) {
 *     // Show validation errors to user
 *     setFormErrors(error.errors);
 *   }
 * }
 */
export function validateOnly<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = safeValidateData(schema, data);
  
  if (!result.success) {
    const errors = getValidationErrors(result.error);
    throw new ValidationError('Validation failed', errors);
  }

  return result.data;
}

/**
 * Batch validation utility
 * Validates multiple documents before batch write
 * 
 * @param schema Zod schema
 * @param dataArray Array of data to validate
 * @returns Array of validated data
 * @throws ValidationError with all validation errors
 */
export function validateBatch<T>(
  schema: z.ZodSchema<T>,
  dataArray: unknown[]
): T[] {
  const allErrors: Record<string, string> = {};
  const validatedData: T[] = [];
  let hasErrors = false;

  dataArray.forEach((data, index) => {
    const result = safeValidateData(schema, data);
    
    if (!result.success) {
      hasErrors = true;
      const errors = getValidationErrors(result.error);
      Object.entries(errors).forEach(([field, error]) => {
        allErrors[`[${index}].${field}`] = error;
      });
    } else {
      validatedData.push(result.data);
    }
  });

  if (hasErrors) {
    throw new ValidationError('Batch validation failed', allErrors);
  }

  return validatedData;
}

/**
 * React Hook for form validation
 * Returns validation function and error state
 * 
 * @example
 * function MyForm() {
 *   const { validate, errors, clearErrors } = useValidation(UserInputSchema);
 *   
 *   const handleSubmit = (data) => {
 *     try {
 *       const validData = validate(data);
 *       // Submit valid data
 *     } catch (error) {
 *       // Errors automatically set in state
 *     }
 *   };
 * }
 */
export function useValidation<T>(schema: z.ZodSchema<T>) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = React.useCallback(
    (data: unknown): T => {
      try {
        const validData = validateOnly(schema, data);
        setErrors({});
        return validData;
      } catch (error) {
        if (error instanceof ValidationError) {
          setErrors(error.errors);
        }
        throw error;
      }
    },
    [schema]
  );

  const clearErrors = React.useCallback(() => {
    setErrors({});
  }, []);

  const getFieldError = React.useCallback(
    (field: string): string | undefined => {
      return errors[field];
    },
    [errors]
  );

  return {
    validate,
    errors,
    clearErrors,
    getFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
}
