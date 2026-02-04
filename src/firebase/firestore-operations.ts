import { addDoc, updateDoc, deleteDoc, CollectionReference, DocumentReference, DocumentData, WithFieldValue } from 'firebase/firestore';
import { errorEmitter } from './error-emitter';
import { FirestorePermissionError } from './errors';

/**
 * Wraps a Firestore operation with error handling for permission errors
 */
async function withErrorHandling<T>(
  operation: () => Promise<T>,
  path: string,
  operationType: 'create' | 'update' | 'delete',
  requestResourceData?: any
): Promise<T | void> {
  try {
    return await operation();
  } catch (error) {
    const permissionError = new FirestorePermissionError({
      path,
      operation: operationType,
      requestResourceData,
    });
    errorEmitter.emit('permission-error', permissionError);
  }
}

/**
 * Creates a document in a Firestore collection with error handling
 */
export function createDocument(
  collectionRef: CollectionReference,
  data: WithFieldValue<DocumentData>
): Promise<void> {
  return withErrorHandling(
    async () => {
      await addDoc(collectionRef, data);
    },
    collectionRef.path,
    'create',
    data
  );
}

/**
 * Updates a document in Firestore with error handling
 */
export function updateDocument(
  docRef: DocumentReference,
  data: Partial<DocumentData>
): Promise<void> {
  return withErrorHandling(
    async () => {
      await updateDoc(docRef, data);
    },
    docRef.path,
    'update',
    data
  );
}

/**
 * Deletes a document from Firestore with error handling
 */
export function deleteDocument(docRef: DocumentReference): Promise<void> {
  return withErrorHandling(
    async () => {
      await deleteDoc(docRef);
    },
    docRef.path,
    'delete'
  );
}
