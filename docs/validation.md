# Data Validation Documentation

## Overview

The Royal Clean Dashboard implements comprehensive data validation using [Zod](https://zod.dev/) schemas. This ensures type safety, data integrity, and prevents invalid data from entering the database.

## Architecture

### Components

1. **Validation Schemas** (`src/lib/validation-schemas.ts`)
   - Zod schemas for all entities
   - TypeScript types inferred from schemas
   - Input schemas for create/update operations

2. **Validation Middleware** (`src/lib/validation-middleware.ts`)
   - Validated Firestore operations
   - Error handling utilities
   - React hooks for form validation

## Validation Schemas

### User Validation

```typescript
import { UserInputSchema, validateData } from '@/lib/validation-schemas';

// Validate user input
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'worker'
};

const validUser = validateData(UserInputSchema, userData);
// ✅ Returns typed user data or throws ZodError
```

### Daily Report Validation

```typescript
import { DailyReportInputSchema } from '@/lib/validation-schemas';

const reportData = {
  date: Timestamp.now(),
  siteId: 'site123',
  clientName: 'ABC Company',
  workers: [{ id: 'worker1', name: 'Ahmad' }],
  tasks: ['cleaning', 'disinfection'],
  startTime: '08:00',
  endTime: '12:00',
};

const validReport = validateData(DailyReportInputSchema, reportData);
```

### Available Schemas

| Schema | Input Schema | Description |
|--------|-------------|-------------|
| `UserSchema` | `UserInputSchema` | User profiles with roles |
| `SiteSchema` | `SiteInputSchema` | Cleaning sites |
| `ClientSchema` | `ClientInputSchema` | Clients |
| `DailyReportSchema` | `DailyReportInputSchema` | Daily work reports |
| `ScheduleSchema` | `ScheduleInputSchema` | Job schedules |
| `TaskSchema` | `TaskInputSchema` | Task definitions |
| `MaterialSchema` | `MaterialInputSchema` | Materials |
| `EquipmentSchema` | `EquipmentInputSchema` | Equipment inventory |
| `WorkerTaskSchema` | `WorkerTaskInputSchema` | Worker task assignments |
| `AppointmentSchema` | `AppointmentInputSchema` | Appointments |
| `AuditLogSchema` | `AuditLogInputSchema` | Audit logs |

## Validated Firestore Operations

### Adding Documents

```typescript
import { addValidatedDoc } from '@/lib/validation-middleware';
import { UserInputSchema } from '@/lib/validation-schemas';
import { db } from '@/firebase/config';

try {
  const docRef = await addValidatedDoc(
    db,
    'users',
    UserInputSchema,
    {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'worker'
    }
  );
  
  console.log('User created:', docRef.id);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation errors:', error.errors);
  }
}
```

### Setting Documents

```typescript
import { setValidatedDoc } from '@/lib/validation-middleware';

await setValidatedDoc(
  db,
  'users',
  'user123',  // Specific document ID
  UserInputSchema,
  userData,
  false  // merge = false (replace document)
);
```

### Updating Documents

```typescript
import { updateValidatedDoc } from '@/lib/validation-middleware';
import { UserInputSchema } from '@/lib/validation-schemas';

// Use .partial() for partial updates
await updateValidatedDoc(
  db,
  'users',
  'user123',
  UserInputSchema.partial(),
  {
    name: 'John Updated'
    // Other fields not required for partial update
  }
);
```

## Form Validation

### Using the Validation Hook

```typescript
'use client';

import { useState } from 'react';
import { useValidation } from '@/lib/validation-middleware';
import { UserInputSchema } from '@/lib/validation-schemas';

function UserForm() {
  const { validate, errors, clearErrors, hasErrors } = useValidation(UserInputSchema);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'worker'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validData = validate(formData);
      
      // Submit to Firestore
      await addValidatedDoc(db, 'users', UserInputSchema, validData);
      
      // Success
      alert('User created successfully!');
      clearErrors();
    } catch (error) {
      // Validation errors are automatically set in errors state
      console.error('Validation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <button type="submit" disabled={hasErrors}>
        Submit
      </button>
    </form>
  );
}
```

### Safe Validation

```typescript
import { safeValidateData } from '@/lib/validation-schemas';

const result = safeValidateData(UserInputSchema, formData);

if (result.success) {
  // Use result.data
  console.log('Valid data:', result.data);
} else {
  // Handle error.error (ZodError)
  console.error('Validation failed:', result.error);
}
```

## Validation Rules

### User

- `name`: Required, minimum 1 character
- `email`: Required, valid email format
- `role`: Required, one of `admin`, `supervisor`, `worker`
- `phone`: Optional string

### Site

- `name`: Required, minimum 1 character
- `clientId`: Required reference to client
- `address`: Required, minimum 1 character
- `specialInstructions`: Optional

### Daily Report

- `clientName`: Required, minimum 1 character
- `workers`: Required array, minimum 1 worker
- `tasks`: Required array, minimum 1 task
- `workerIds`: Required array, minimum 1 ID
- `beforeImages`: Optional array of valid URLs
- `afterImages`: Optional array of valid URLs
- `totalCost`: Optional number, minimum 0

### Equipment

- `name`: Required
- `condition`: Required, one of `ممتازة`, `جيدة`, `تحتاج صيانة`
- `quantity`: Required number, minimum 0
- `supervisor`: Required

## Error Handling

### Validation Error Structure

```typescript
try {
  await addValidatedDoc(db, 'users', UserInputSchema, invalidData);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(error.message); // "Validation failed"
    console.log(error.errors);  
    // {
    //   "email": "Invalid email",
    //   "name": "String must contain at least 1 character(s)"
    // }
  }
}
```

### Getting Field-Specific Errors

```typescript
import { getValidationErrors } from '@/lib/validation-schemas';

try {
  schema.parse(data);
} catch (error) {
  if (error instanceof z.ZodError) {
    const errors = getValidationErrors(error);
    
    // Display errors per field
    Object.entries(errors).forEach(([field, message]) => {
      console.log(`${field}: ${message}`);
    });
  }
}
```

## Batch Validation

```typescript
import { validateBatch } from '@/lib/validation-middleware';

const usersData = [
  { name: 'User 1', email: 'user1@example.com', role: 'worker' },
  { name: 'User 2', email: 'invalid-email', role: 'worker' },
  { name: 'User 3', email: 'user3@example.com', role: 'worker' },
];

try {
  const validUsers = validateBatch(UserInputSchema, usersData);
  
  // All valid - proceed with batch write
  const batch = writeBatch(db);
  validUsers.forEach((user) => {
    const docRef = doc(collection(db, 'users'));
    batch.set(docRef, user);
  });
  await batch.commit();
  
} catch (error) {
  if (error instanceof ValidationError) {
    // error.errors contains all validation errors from all items
    // e.g., { "[1].email": "Invalid email" }
    console.error(error.errors);
  }
}
```

## Custom Validations

### Extending Schemas

```typescript
import { z } from 'zod';
import { UserInputSchema } from '@/lib/validation-schemas';

// Add custom validation
const ExtendedUserSchema = UserInputSchema.extend({
  age: z.number().min(18).max(100),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,15}$/),
});

// Add refinements
const StrictUserSchema = UserInputSchema.refine(
  (data) => data.email.endsWith('@company.com'),
  {
    message: 'Email must be from company domain',
    path: ['email'],
  }
);
```

### Custom Validators

```typescript
// Phone number validator for Saudi Arabia
const saudiPhoneSchema = z.string().refine(
  (phone) => /^(05|5)\d{8}$/.test(phone.replace(/\s/g, '')),
  {
    message: 'Invalid Saudi phone number',
  }
);

// Date validator (must be in the future)
const futureDateSchema = z.string().refine(
  (dateStr) => new Date(dateStr) > new Date(),
  {
    message: 'Date must be in the future',
  }
);
```

## Integration with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserInputSchema } from '@/lib/validation-schemas';

function UserFormWithRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserInputSchema),
  });

  const onSubmit = async (data) => {
    // Data is already validated by react-hook-form
    await addValidatedDoc(db, 'users', UserInputSchema, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Best Practices

1. **Always Validate User Input**: Never trust client-side data
2. **Use Input Schemas**: Separate schemas for input (create/update) and output
3. **Validate Before Write**: Use validation middleware for all Firestore writes
4. **Handle Errors Gracefully**: Show user-friendly error messages
5. **Type Safety**: Leverage TypeScript types inferred from schemas
6. **Partial Updates**: Use `.partial()` for update operations
7. **Batch Operations**: Validate all items before batch write
8. **Custom Validations**: Extend schemas for business-specific rules

## Testing Validation

```typescript
import { describe, it, expect } from 'vitest';
import { UserInputSchema } from '@/lib/validation-schemas';

describe('UserInputSchema', () => {
  it('should validate valid user data', () => {
    const validUser = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'worker',
    };
    
    expect(() => UserInputSchema.parse(validUser)).not.toThrow();
  });

  it('should reject invalid email', () => {
    const invalidUser = {
      name: 'John Doe',
      email: 'invalid-email',
      role: 'worker',
    };
    
    expect(() => UserInputSchema.parse(invalidUser)).toThrow();
  });

  it('should reject invalid role', () => {
    const invalidUser = {
      name: 'John Doe',
      email: 'john@example.com',
      role: 'invalid_role',
    };
    
    expect(() => UserInputSchema.parse(invalidUser)).toThrow();
  });
});
```

## Related Documentation

- [Zod Documentation](https://zod.dev/)
- [Database Documentation](./database/README.md)
- [JSON Schemas](../docs/schemas/)
- [TypeScript Types](../src/lib/types.ts)
