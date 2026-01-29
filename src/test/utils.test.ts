import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-4', 'py-2');
    expect(result).toBe('px-4 py-2');
  });

  it('should handle conditional classes', () => {
    const result = cn('base-class', true && 'conditional-class', false && 'hidden-class');
    expect(result).toBe('base-class conditional-class');
  });

  it('should merge conflicting Tailwind classes', () => {
    const result = cn('p-4', 'p-2');
    expect(result).toBe('p-2');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class-1', 'class-2'], 'class-3');
    expect(result).toBe('class-1 class-2 class-3');
  });

  it('should handle undefined and null values', () => {
    const result = cn('valid-class', undefined, null);
    expect(result).toBe('valid-class');
  });
});
