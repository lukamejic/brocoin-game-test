import { v4 as uuidv4 } from 'uuid';

/**
 * Get values that are not present in the second parameter.
 * @param a An array of values to filter.
 * @param b An array of values that are used as a filter.
 * @returns Values that are not present in the second parameter, or an empty array.
 */
export function filterNotPresent(
  a: Array<any> = [],
  b: Array<any> = []
): Array<any> {
  return a.filter((el) => b.indexOf(el) === -1) || [];
}

export function generateUuid(): string {
  return uuidv4();
}

export function generatePhoneNumberVerificationCode(): string {
  return uuidv4().slice(-6).toUpperCase();
}