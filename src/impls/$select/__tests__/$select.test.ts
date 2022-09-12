import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $select } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

const maxSelector = (a: number, b: number) => b > a;
const minSelector = (a: number, b: number) => b < a;

describe($`select`, () => {
  describe('when source is empty', () => {
    it(
      'should return undefined',
      $async(() => {
        expect($await($select(maxSelector, null))).toEqual(undefined);
        expect($await($select(maxSelector, undefined))).toEqual(undefined);
        expect($await($select(maxSelector, $wrap([])))).toEqual(undefined);
      }),
    );
  });

  describe('when source has a single value', () => {
    it(
      'should return that value',
      $async(() => {
        expect($await($select(maxSelector, $wrap([1])))).toEqual(1);
        expect($await($select(minSelector, $wrap([1])))).toEqual(1);
      }),
    );
  });

  describe('when source has values', () => {
    it(
      'should return the best value, according to selector function',
      $async(() => {
        expect($await($select(maxSelector, $wrap([1, 2, 3])))).toEqual(3);
        expect($await($select(minSelector, $wrap([1, 2, 3])))).toEqual(1);
      }),
    );
  });
});
