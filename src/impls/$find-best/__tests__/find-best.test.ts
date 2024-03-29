/**
 * @generated-from ./$find-best.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { findBest, firstHighest, firstLowest } from 'iter-tools-es';
import { wrap } from '../../../test/helpers.js';

type Person = {
  name: string;
  age: number;
};

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

describe('findBest', () => {
  describe('when source is empty', () => {
    it('should return undefined', () => {
      const mapper = (value: Person) => value.age;
      expect(findBest(firstHighest, mapper, null)).toEqual(undefined);
      expect(findBest(firstHighest, mapper, undefined)).toEqual(undefined);
      expect(findBest(firstHighest, mapper, wrap([]))).toEqual(undefined);
    });
  });

  describe('when source has a single value', () => {
    it('should return that value', () => {
      expect(findBest(firstHighest, wrap([1]))).toEqual(1);
      expect(findBest(firstLowest, wrap([1]))).toEqual(1);
    });
  });

  describe('when source has values', () => {
    it('should return the best value according to mapper and compare function', () => {
      expect(findBest(firstHighest, (p) => p.age, wrap(people))).toEqual(oldest);
      expect(findBest(firstLowest, (p) => p.age, wrap(people))).toEqual(youngest);
    });
  });
});
