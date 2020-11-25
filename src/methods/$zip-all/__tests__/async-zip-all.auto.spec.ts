/**
 * @generated-from ./async-zip-all.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncZipAll, asyncToArray } from '../../..';
import { asyncWrap } from '../../../test/async-helpers';

describe('asyncZipAll', () => {
  describe('when sources are of equal length', () => {
    it('yields all values', async () => {
      const iter = asyncZipAll(asyncWrap([1, 2, 3]), asyncWrap([4, 5, 6]), asyncWrap([7, 8, 9]));
      expect(await asyncToArray(iter)).toEqual([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]);
    });
  });

  describe('when some iterables are shorter than others', () => {
    describe('when filler is specified', () => {
      it('fills with filler', async () => {
        const iter = asyncZipAll(
          { filler: null },
          asyncWrap([1, 2, 3]),
          asyncWrap([4, 5]),
          asyncWrap([7, 8]),
        );
        expect(await asyncToArray(iter)).toEqual([
          [1, 4, 7],
          [2, 5, 8],
          [3, null, null],
        ]);
      });
    });

    describe('when filler is not specified', () => {
      it('fills with undefined', async () => {
        const iter = asyncZipAll(asyncWrap([1, 2, 3]), asyncWrap([4, 5]), asyncWrap([7, 8]));
        expect(await asyncToArray(iter)).toEqual([
          [1, 4, 7],
          [2, 5, 8],
          [3, undefined, undefined],
        ]);
      });
    });
  });
});
