import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $selectBy } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

type Person = { name: string; age: number };
const personAge = (p: Person) => p.age;
const maxSelector = (a: number, b: number) => b > a;
const minSelector = (a: number, b: number) => b < a;

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

describe($`selectBy`, () => {
  describe('when source is empty', () => {
    it(
      'should return undefined',
      $async(() => {
        expect($await($selectBy(personAge, maxSelector, null))).toEqual(undefined);
        expect($await($selectBy(personAge, maxSelector, undefined))).toEqual(undefined);
        expect($await($selectBy(personAge, maxSelector, $wrap([])))).toEqual(undefined);
      }),
    );
  });

  describe('when source has a single value', () => {
    it(
      'should return that value',
      $async(() => {
        expect($await($selectBy((i) => i, maxSelector, $wrap([1])))).toEqual(1);
        expect($await($selectBy((i) => i, minSelector, $wrap([1])))).toEqual(1);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'should return the best value according mapper and selector function',
      $async(() => {
        expect($await($selectBy(personAge, maxSelector, $wrap(people)))).toEqual(oldest);
        expect($await($selectBy(personAge, minSelector, $wrap(people)))).toEqual(youngest);
      }),
    );
  });
});
