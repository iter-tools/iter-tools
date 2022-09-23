import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $findBest, firstHighest, firstLowest } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

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

describe($`findBest`, () => {
  describe('when source is empty', () => {
    it(
      'should return undefined',
      $async(() => {
        const mapper = (value: Person) => value.age;
        expect($await($findBest(firstHighest, mapper, null))).toEqual(undefined);
        expect($await($findBest(firstHighest, mapper, undefined))).toEqual(undefined);
        expect($await($findBest(firstHighest, mapper, $wrap([])))).toEqual(undefined);
      }),
    );
  });

  describe('when source has a single value', () => {
    it(
      'should return that value',
      $async(() => {
        expect($await($findBest(firstHighest, $wrap([1])))).toEqual(1);
        expect($await($findBest(firstLowest, $wrap([1])))).toEqual(1);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'should return the best value according to mapper and compare function',
      $async(() => {
        expect(
          $await(
            $findBest(
              firstHighest,
              $async((p) => p.age),
              $wrap(people),
            ),
          ),
        ).toEqual(oldest);
        expect(
          $await(
            $findBest(
              firstLowest,
              $async((p) => p.age),
              $wrap(people),
            ),
          ),
        ).toEqual(youngest);
      }),
    );
  });
});
