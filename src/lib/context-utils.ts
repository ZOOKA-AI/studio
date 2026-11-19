import { useContext, Context } from 'react';

/**
 * Creates a typed hook for consuming a React context with error checking
 * @param context - The React context to consume
 * @param contextName - The name of the context for error messages
 * @returns A hook that returns the context value or throws an error
 */
export function createContextHook<T>(
  context: Context<T | undefined>,
  contextName: string
): () => T {
  return function useContextHook(): T {
    const value = useContext(context);
    if (value === undefined) {
      throw new Error(`${contextName} must be used within a ${contextName}Provider`);
    }
    return value;
  };
}
