import { $, $async, $await, $isAsync } from '../../../../generate/async.macro.cjs';

import { $maxBy } from 'iter-tools-es';
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

describe($`maxBy`, () => {
  describe('when source is empty', () => {
    it(
      'should return undefined',
      $async(() => {
        expect($await($maxBy(personAge, null))).toEqual(undefined);
        expect($await($maxBy(personAge, ascendingOrder, null))).toEqual(undefined);
        expect($await($maxBy(personAge, ascendingOrder, undefined))).toEqual(undefined);
        expect($await($maxBy(personAge, ascendingOrder, $wrap([])))).toEqual(undefined);
      }),
    );
  });

  describe('when source has a single value', () => {
    it(
      'should return that value',
      $async(() => {
        expect($await($maxBy((i) => i, $wrap([1])))).toEqual(1);
        expect($await($maxBy((i) => i, ascendingOrder, $wrap([1])))).toEqual(1);
        expect($await($maxBy((i) => i, descendingOrder, $wrap([1])))).toEqual(1);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'should return the best value according mapper and selector function',
      $async(() => {
        expect($await($maxBy(personAge, $wrap(people)))).toEqual(oldest);
        expect($await($maxBy(personAge, ascendingOrder, $wrap(people)))).toEqual(oldest);
        expect($await($maxBy(personAge, descendingOrder, $wrap(people)))).toEqual(youngest);
      }),
    );

    if ($isAsync) {
      it('may take an async mapper function', async () => {
        expect($await($maxBy(async (p) => p.age, $wrap(people)))).toEqual(oldest);
        expect($await($maxBy(async (p) => p.age, descendingOrder, $wrap(people)))).toEqual(
          youngest,
        );
      });
    }
  });
});
