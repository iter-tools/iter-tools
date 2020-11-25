/**
 * @generated-from ./async-drop-while.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncDropWhile } from '../../..';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers';

describe('asyncDropWhile', () => {
  describe('when source is empty', () => {
    it('yields no values', async () => {
      expect(await asyncUnwrap(asyncDropWhile((item: any) => item, null))).toEqual([]);
      expect(await asyncUnwrap(asyncDropWhile((item: any) => item, undefined))).toEqual([]);
      expect(await asyncUnwrap(asyncDropWhile((item: any) => item, asyncWrap([])))).toEqual([]);
    });
  });

  describe('when source has values', () => {
    describe('when no values match predicate', () => {
      it('yields values from source', async () => {
        const iter = asyncDropWhile((i) => i !== i, asyncWrap([1, 2, 3, 4, 5, 6]));
        expect(await asyncUnwrap(iter)).toEqual([1, 2, 3, 4, 5, 6]);
      });
    });

    describe('when all values match predicate', () => {
      it('yields no values', async () => {
        const iter = asyncDropWhile((i) => i === i, asyncWrap([1, 2, 3, 4, 5, 6]));
        expect(await asyncUnwrap(iter)).toEqual([]);
      });
    });

    describe('when a value matches predicate', () => {
      it('yields the matching value and subsequent values', async () => {
        const iter = asyncDropWhile((i) => i !== 4, asyncWrap([1, 2, 3, 4, 5, 6]));
        expect(await asyncUnwrap(iter)).toEqual([4, 5, 6]);
      });
    });
  });

  it('may take an async predicate', async () => {
    const iter = asyncDropWhile(async (i) => i !== 4, asyncWrap([1, 2, 3, 4, 5, 6]));
    expect(await asyncUnwrap(iter)).toEqual([4, 5, 6]);
  });
});
