// unit.test.js

import * as functions from '../code-to-unit-test/unit-test-me.js';

describe('isPhoneNumber', () => {
  test('returns true for (408) 123-4567', () => {
    expect(functions.isPhoneNumber('(408) 123-4567')).toBe(true);
  });

  test('returns true for 858-534-2218', () => {
    expect(functions.isPhoneNumber('858-534-2218')).toBe(true);
  });

  test('returns false for unrelated text', () => {
    expect(functions.isPhoneNumber('this is not a phone number')).toBe(false);
  });

  test('returns false when local number segment is incomplete', () => {
    expect(functions.isPhoneNumber('858-534')).toBe(false);
  });
});

describe('isEmail', () => {
  test('returns true for user@gmail.com', () => {
    expect(functions.isEmail('user@gmail.com')).toBe(true);
  });

  test('returns true for short domain TLD', () => {
    expect(functions.isEmail('hello@test.co')).toBe(true);
  });

  test('returns false when TLD is too short', () => {
    expect(functions.isEmail('user@domain.c')).toBe(false);
  });

  test('returns false without an @ symbol', () => {
    expect(functions.isEmail('not-an-email')).toBe(false);
  });
});

describe('isStrongPassword', () => {
  test('returns true for minimum valid password', () => {
    expect(functions.isStrongPassword('Abcd')).toBe(true);
  });

  test('returns true for letters, digits, and underscore', () => {
    expect(functions.isStrongPassword('Hello_world99')).toBe(true);
  });

  test('returns false when first character is not a letter', () => {
    expect(functions.isStrongPassword('9startsWrong')).toBe(false);
  });

  test('returns false when shorter than 4 characters', () => {
    expect(functions.isStrongPassword('Hi1')).toBe(false);
  });
});

describe('isDate', () => {
  test('returns true for MM/DD/YYYY with two-digit month and day', () => {
    expect(functions.isDate('01/02/2024')).toBe(true);
  });

  test('returns true for single-digit month and day', () => {
    expect(functions.isDate('5/9/1999')).toBe(true);
  });

  test('returns false for ISO-style year-first ordering', () => {
    expect(functions.isDate('2024/01/02')).toBe(false);
  });

  test('returns false when slashes are missing', () => {
    expect(functions.isDate('01-02-2024')).toBe(false);
  });
});

describe('isHexColor', () => {
  test('returns true for 3-digit hex with hash', () => {
    expect(functions.isHexColor('#FFF')).toBe(true);
  });

  test('returns true for 6-digit hex without hash', () => {
    expect(functions.isHexColor('aabbcc')).toBe(true);
  });

  test('returns false for invalid hex letters', () => {
    expect(functions.isHexColor('#GGGGGG')).toBe(false);
  });

  test('returns false for incomplete hex value', () => {
    expect(functions.isHexColor('#ff')).toBe(false);
  });
});
