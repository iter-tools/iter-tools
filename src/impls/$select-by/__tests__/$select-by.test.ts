import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $selectBy } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

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
        expect($await($selectBy(personAge, maxSelector, $wrap(PERSONS)))?.age).toEqual(30);
        expect($await($selectBy(personAge, minSelector, $wrap(PERSONS)))?.age).toEqual(10);
      }),
    );
  });
});
