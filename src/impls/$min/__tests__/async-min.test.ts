/**
 * @generated-from ./$min.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncMin } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

const youngest = {
  name: 'a',
  age: 10,
};
const middle = {
  name: 'b',
  age: 20,
};
const oldest = {
  name: 'c',
  age: 30,
};

const people = [youngest, middle, oldest];

describe('asyncMin', () => {
  describe('when source is empty', () => {
    it('should return undefined', async () => {
      expect(await asyncMin(null)).toEqual(undefined);
      expect(await asyncMin(undefined)).toEqual(undefined);
      expect(await asyncMin(asyncWrap([]))).toEqual(undefined);
    });
  });

  describe('when source has a single value', () => {
    it('should return that value', async () => {
      expect(await asyncMin(asyncWrap([1]))).toEqual(1);
      expect(await asyncMin(asyncWrap([1]))).toEqual(1);
    });
  });

  describe('when source has values', () => {
    it('should return the minimum value, according to comparator function', async () => {
      expect(await asyncMin(asyncWrap([1, 3, 2]))).toEqual(1);
      expect(await asyncMin((a, b) => b - a, asyncWrap([1, 3, 2]))).toEqual(3);
      expect(await asyncMin((a, b) => a.age - b.age, asyncWrap(people))).toEqual(youngest);
      expect(await asyncMin((a, b) => b.age - a.age, asyncWrap(people))).toEqual(oldest);
    });
  });
});
