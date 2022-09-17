import { $, $async, $await, $isAsync } from '../../../../generate/async.macro.cjs';

import { $minBy } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

type Person = { name: string; age: number };
const personAge = (p: Person) => p.age;
const ascendingOrder = (a: number, b: number) => a - b;
const descendingOrder = (a: number, b: number) => b - a;

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

describe($`minBy`, () => {
  describe('when source is empty', () => {
    it(
      'should return undefined',
      $async(() => {
        expect($await($minBy(personAge, null))).toEqual(undefined);
        expect($await($minBy(personAge, ascendingOrder, null))).toEqual(undefined);
        expect($await($minBy(personAge, ascendingOrder, undefined))).toEqual(undefined);
        expect($await($minBy(personAge, ascendingOrder, $wrap([])))).toEqual(undefined);
      }),
    );
  });

  describe('when source has a single value', () => {
    it(
      'should return that value',
      $async(() => {
        expect($await($minBy((i) => i, $wrap([1])))).toEqual(1);
        expect($await($minBy((i) => i, ascendingOrder, $wrap([1])))).toEqual(1);
        expect($await($minBy((i) => i, descendingOrder, $wrap([1])))).toEqual(1);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'should return the minimum value according mapper and selector function',
      $async(() => {
        expect($await($minBy(personAge, $wrap(people)))).toEqual(youngest);
        expect($await($minBy(personAge, ascendingOrder, $wrap(people)))).toEqual(youngest);
        expect($await($minBy(personAge, descendingOrder, $wrap(people)))).toEqual(oldest);
      }),
    );

    if ($isAsync) {
      it('may take an async mapper function', async () => {
        expect($await($minBy(async (p) => p.age, $wrap(people)))).toEqual(youngest);
        expect($await($minBy(async (p) => p.age, descendingOrder, $wrap(people)))).toEqual(oldest);
      });
    }
  });
});
