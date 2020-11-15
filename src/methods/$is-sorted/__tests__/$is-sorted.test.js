import { $, $async, $await } from '../../../../generate/async.macro';

import { $isSorted } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`isSorted`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($isSorted($wrap([])))).toEqual(true);
      }),
    );
  });

  describe('when iterable contains only a single value', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($isSorted($wrap([9000])))).toEqual(true);
      }),
    );
  });

  describe('when the values in iterable are sorted', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($isSorted((a, b) => b - a, $wrap([3, 2, 1])))).toEqual(true);
      }),
    );
  });

  describe('when the values in iterable are not sorted', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($isSorted((a, b) => b - a, $wrap([1, 2, 3])))).toEqual(false);
      }),
    );
  });

  describe('when some values in iterable are equal to each other', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($isSorted((a, b) => b - a, $wrap([3, 2, 2, 2, 1])))).toEqual(true);
      }),
    );
  });

  describe('when no comparator is specified', () => {
    it(
      'compares the default comparator',
      $async(() => {
        expect($await($isSorted('abc'))).toEqual(true);
        expect($await($isSorted('cba'))).toEqual(false);
        expect($await($isSorted('bbb'))).toEqual(true);
      }),
    );
  });
});
