import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Handles Firestore permission errors by emitting them through the error emitter
 */
export function handlePermissionError(
  path: string,
  operation: 'create' | 'update' | 'delete',
  requestResourceData?: any
) {
  const permissionError = new FirestorePermissionError({
    path,
    operation,
    requestResourceData,
  });
  errorEmitter.emit('permission-error', permissionError);
}
