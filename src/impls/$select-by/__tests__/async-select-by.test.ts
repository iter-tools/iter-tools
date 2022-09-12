/**
 * @generated-from ./$select-by.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncSelectBy } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

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

describe('asyncSelectBy', () => {
  describe('when source is empty', () => {
    it('should return undefined', async () => {
      expect(await asyncSelectBy(personAge, maxSelector, null)).toEqual(undefined);
      expect(await asyncSelectBy(personAge, maxSelector, undefined)).toEqual(undefined);
      expect(await asyncSelectBy(personAge, maxSelector, asyncWrap([]))).toEqual(undefined);
    });
  });

  describe('when source has a single value', () => {
    it('should return that value', async () => {
      expect(await asyncSelectBy((i) => i, maxSelector, asyncWrap([1]))).toEqual(1);
      expect(await asyncSelectBy((i) => i, minSelector, asyncWrap([1]))).toEqual(1);
    });
  });

  describe('when source has values', () => {
    it('should return the best value according mapper and selector function', async () => {
      expect((await asyncSelectBy(personAge, maxSelector, asyncWrap(PERSONS)))?.age).toEqual(30);
      expect((await asyncSelectBy(personAge, minSelector, asyncWrap(PERSONS)))?.age).toEqual(10);
    });
  });
});
