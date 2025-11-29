/**
 * @fileoverview
 * Shared utility functions for the bestappever2026 monorepo.
 * This file serves as the single entry point for the `@bestappever2026/utils` package.
 * It exports a collection of formatters, validators, type guards, and other helpers.
 */

// --- Type Definitions ---

// A generic type for any function, used in debounce and throttle.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any[]) => any;

// --- Formatters ---

/**
 * Formats a Date object, timestamp, or string into a localized date string.
 * @param date - The date to format.
 * @param options - Intl.DateTimeFormat options.
 * @param locales - A string with a BCP 47 language tag, or an array of such strings.
 * @returns The formatted date string, or 'Invalid Date' on error.
 */
export const formatDate = (
  date: Date | number | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locales: string | string[] = 'en-US'
): string => {
  try {
    return new Intl.DateTimeFormat(locales, options).format(new Date(date));
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

/**
 * Formats a number as a currency string.
 * @param amount - The numeric amount.
 * @param currency - The ISO 4217 currency code (e.g., 'USD', 'EUR').
 * @param locales - A string with a BCP 47 language tag, or an array of such strings.
 * @returns The formatted currency string, or an empty string on error.
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locales: string | string[] = 'en-US'
): string => {
  try {
    return new Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return '';
  }
};

const TIME_AGO_UNITS = [
  { unit: 'year', seconds: 31536000 },
  { unit: 'month', seconds: 2592000 },
  { unit: 'week', seconds: 604800 },
  { unit: 'day', seconds: 86400 },
  { unit: 'hour', seconds: 3600 },
  { unit: 'minute', seconds: 60 },
  { unit: 'second', seconds: 1 },
] as const;

/**
 * Converts a date to a human-readable "time ago" string.
 * @param date - The date to compare against the current time.
 * @param locales - A string with a BCP 47 language tag, or an array of such strings.
 * @returns A relative time string (e.g., "5 minutes ago"), or 'Invalid Date' on error.
 */
export const timeAgo = (
  date: Date | number | string,
  locales: string | string[] = 'en-US'
): string => {
  try {
    const timeStamp = new Date(date).getTime();
    const now = Date.now();
    const secondsAgo = Math.round((now - timeStamp) / 1000);

    if (secondsAgo < 5) {
      return 'just now';
    }
    
    for (const { unit, seconds } of TIME_AGO_UNITS) {
      const interval = Math.floor(secondsAgo / seconds);
      if (interval >= 1) {
        const rtf = new Intl.RelativeTimeFormat(locales, { numeric: 'auto' });
        return rtf.format(-interval, unit);
      }
    }
    
    // This case should ideally not be reached if date is in the past.
    return formatDate(date, { dateStyle: 'medium' }, locales);
  } catch (error) {
    console.error('Error calculating time ago:', error);
    return 'Invalid Date';
  }
};


// --- Validators ---

/**
 * Validates if a string is a valid email address using a common regex.
 * @param email - The string to validate.
 * @returns `true` if the email is valid, otherwise `false`.
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  // A widely used regex for email validation that covers most common cases.
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};

export interface PasswordStrengthOptions {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialChar?: boolean;
}

const defaultPasswordOptions: Required<PasswordStrengthOptions> = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

/**
 * Validates the strength of a password based on configurable criteria.
 * @param password - The password string to validate.
 * @param options - Configuration for password strength requirements.
 * @returns `true` if the password meets the criteria, otherwise `false`.
 */
export const isStrongPassword = (
  password: string,
  options: PasswordStrengthOptions = {}
): boolean => {
  const config = { ...defaultPasswordOptions, ...options };

  if (password.length < config.minLength) return false;
  if (config.requireUppercase && !/[A-Z]/.test(password)) return false;
  if (config.requireLowercase && !/[a-z]/.test(password)) return false;
  if (config.requireNumber && !/\d/.test(password)) return false;
  if (config.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

  return true;
};


// --- Type Guards ---

/**
 * A type guard to check if a value is not null or undefined.
 * Especially useful for filtering arrays: `array.filter(isDefined)`.
 * @param value - The value to check.
 * @returns `true` if the value is not `null` and not `undefined`, `false` otherwise.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * A type guard to check if a value is a non-null object (and not an array).
 * @param value - The value to check.
 * @returns `true` if the value is an object, `false` otherwise.
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}


// --- Asynchronous & Event Utilities ---

/**
 * Creates a debounced function that delays invoking the provided function until after `wait`
 * milliseconds have elapsed since the last time the debounced function was invoked.
 * @param func - The function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<T extends AnyFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

/**
 * Creates a throttled function that only invokes `func` at most once per every
 * `wait` milliseconds. Useful for rate-limiting events like resizing or scrolling.
 * This is a leading-edge-only implementation.
 * @param func - The function to throttle.
 * @param wait - The number of milliseconds to throttle invocations to.
 * @returns A new throttled function that returns the result of the last successful invocation.
 */
export function throttle<T extends AnyFunction>(
  func: T,
  wait: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> | undefined {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
      lastResult = func.apply(this, args);
    }
    return lastResult;
  };
}


// --- Miscellaneous Utilities ---

type ClassValue = string | number | boolean | null | undefined | { [key: string]: boolean };

/**
 * A tiny, fast utility for conditionally joining class names together.
 * Mimics the behavior of the popular `clsx` library.
 * @param classes - A list of class values (strings, numbers, objects).
 * @returns A single string of space-separated class names.
 */
export const clsx = (...classes: ClassValue[]): string => {
  const result: string[] = [];

  classes.forEach((c) => {
    if (!c) return;

    if (typeof c === 'string' || typeof c === 'number') {
      result.push(String(c));
    } else if (isObject(c)) {
      Object.keys(c).forEach((key) => {
        if (c[key]) {
          result.push(key);
        }
      });
    }
  });

  return result.join(' ');
};

/**
 * Generates a simple, short, and likely unique ID.
 * This is NOT cryptographically secure. Useful for DOM element IDs, list keys, etc.
 * @param prefix - An optional prefix for the ID (defaults to 'id_').
 * @returns A unique string ID.
 */
export const generateId = (prefix = 'id_'): string => {
  return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
};