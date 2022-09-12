/**
 * @generated-from ./$select-by.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { selectBy } from 'iter-tools-es';
import { wrap } from '../../../test/helpers.js';

type Person = { name: string; age: number };
const personAge = (p: Person) => p.age;
const maxSelector = (a: number, b: number) => b > a;
const minSelector = (a: number, b: number) => b < a;

// Sample data
const PERSONS = [
  {
    name: 'a',
    age: 10,
  },
  {
    name: 'b',
    age: 20,
  },
  {
    name: 'c',
    age: 30,
  },
];

describe('selectBy', () => {
  describe('when source is empty', () => {
    it('should return undefined', () => {
      expect(selectBy(personAge, maxSelector, null)).toEqual(undefined);
      expect(selectBy(personAge, maxSelector, undefined)).toEqual(undefined);
      expect(selectBy(personAge, maxSelector, wrap([]))).toEqual(undefined);
    });
  });

  describe('when source has a single value', () => {
    it('should return that value', () => {
      expect(selectBy((i) => i, maxSelector, wrap([1]))).toEqual(1);
      expect(selectBy((i) => i, minSelector, wrap([1]))).toEqual(1);
    });
  });

  describe('when source has values', () => {
    it('should return the best value according mapper and selector function', () => {
      expect(selectBy(personAge, maxSelector, wrap(PERSONS))?.age).toEqual(30);
      expect(selectBy(personAge, minSelector, wrap(PERSONS))?.age).toEqual(10);
    });
  });
});
