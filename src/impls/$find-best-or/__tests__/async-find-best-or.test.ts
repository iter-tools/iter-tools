/**
 * @generated-from ./$find-best-or.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncFindBestOr, firstHighest, firstLowest } from 'iter-tools-es';
import { asyncWrap } from '../../../test/async-helpers.js';

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

const none = Symbol('none');

describe('asyncFindBestOr', () => {
  describe('when source is empty', () => {
    it('should return notFoundValue', async () => {
      const mapper = (value: Person) => value.age;
      expect(await asyncFindBestOr(none, firstHighest, mapper, null)).toEqual(none);
      expect(await asyncFindBestOr(none, firstHighest, mapper, undefined)).toEqual(none);
      expect(await asyncFindBestOr(none, firstHighest, mapper, asyncWrap([]))).toEqual(none);
    });
  });

  describe('when source has a single value', () => {
    it('should return that value', async () => {
      expect(await asyncFindBestOr(none, firstHighest, asyncWrap([1]))).toEqual(1);
      expect(await asyncFindBestOr(none, firstLowest, asyncWrap([1]))).toEqual(1);
    });
  });

  describe('when source has values', () => {
    it('should return the best value according to mapper and compare function', async () => {
      expect(
        await asyncFindBestOr(none, firstHighest, async (p) => p.age, asyncWrap(people)),
      ).toEqual(oldest);
      expect(
        await asyncFindBestOr(none, firstLowest, async (p) => p.age, asyncWrap(people)),
      ).toEqual(youngest);
    });
  });
});
