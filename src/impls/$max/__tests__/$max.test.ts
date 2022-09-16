import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $max } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

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

describe($`max`, () => {
  describe('when source is empty', () => {
    it(
      'should return undefined',
      $async(() => {
        expect($await($max(null))).toEqual(undefined);
        expect($await($max(undefined))).toEqual(undefined);
        expect($await($max($wrap([])))).toEqual(undefined);
      }),
    );
  });

  describe('when source has a single value', () => {
    it(
      'should return that value',
      $async(() => {
        expect($await($max($wrap([1])))).toEqual(1);
        expect($await($max($wrap([1])))).toEqual(1);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'should return the maximum value, according to comparator function',
      $async(() => {
        expect($await($max($wrap([1, 3, 2])))).toEqual(3);
        expect($await($max((a, b) => b - a, $wrap([1, 3, 2])))).toEqual(1);
        expect($await($max((a, b) => a.age - b.age, $wrap(people)))).toEqual(oldest);
        expect($await($max((a, b) => b.age - a.age, $wrap(people)))).toEqual(youngest);
      }),
    );
  });
});
