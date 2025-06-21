import { describe, it, expect, vi } from 'vitest';
import { isValidUrl, isApiError } from '../../lib/utils';

describe('isValidUrl - blackbox', () => {
    it('returns true for a valid URL', () => {
        expect(isValidUrl('https://example.com')).toBe(true);
    });

    it('returns false for an invalid URL', () => {
        expect(isValidUrl('not-a-url')).toBe(false);
    });
});

describe('isApiError - blackbox', () => {
    it('returns true for object with string message', () => {
        expect(isApiError({ message: 'Something went wrong' })).toBe(true);
    });

    it('returns false for non-object input', () => {
        expect(isApiError('error')).toBe(false);
    });
});

describe('isValidUrl - whitebox using mocks', () => {
    it('should return false if URL constructor throws', () => {
        const URLMock = vi.fn(() => { throw new Error('Invalid'); });

        const originalURL = global.URL;
        // @ts-ignore
        global.URL = URLMock;

        const result = isValidUrl('invalid-url');
        expect(result).toBe(false);

        global.URL = originalURL;
    });
});
