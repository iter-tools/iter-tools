import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $findBestOr, firstHighest, firstLowest } from 'iter-tools-es';
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

const none = Symbol('none');

describe($`findBestOr`, () => {
  describe('when source is empty', () => {
    it(
      'should return notFoundValue',
      $async(() => {
        const mapper = (value: Person) => value.age;
        expect($await($findBestOr(none, firstHighest, mapper, null))).toEqual(none);
        expect($await($findBestOr(none, firstHighest, mapper, undefined))).toEqual(none);
        expect($await($findBestOr(none, firstHighest, mapper, $wrap([])))).toEqual(none);
      }),
    );
  });

  describe('when source has a single value', () => {
    it(
      'should return that value',
      $async(() => {
        expect($await($findBestOr(none, firstHighest, $wrap([1])))).toEqual(1);
        expect($await($findBestOr(none, firstLowest, $wrap([1])))).toEqual(1);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'should return the best value according to mapper and compare function',
      $async(() => {
        expect(
          $await(
            $findBestOr(
              none,
              firstHighest,
              $async((p) => p.age),
              $wrap(people),
            ),
          ),
        ).toEqual(oldest);
        expect(
          $await(
            $findBestOr(
              none,
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
