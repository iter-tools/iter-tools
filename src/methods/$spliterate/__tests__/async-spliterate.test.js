/**
 * @generated-from ./$spliterate.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncSpliterate } from '../../..';
import { asyncUnwrapDeep as asyncUw } from '../../../__tests__/async-helpers';
import { asyncWrap } from '../../../__tests__/__framework__/async-wrap';
import { split } from '../async-spliterate';

async function* asyncIdentityStrategy(_split: any, _options: any, source: any) {
  yield* source;
}

describe('asyncSpliterate', () => {
  const asyncTestSpliterator = asyncSpliterate(asyncIdentityStrategy, {});

  describe('when spliterator is empty', () => {
    it('yields no groups', async () => {
      expect(await asyncUw(asyncTestSpliterator([]))).toEqual([]);
    });
  });

  describe('when spliterator contains only a split', () => {
    it('yields two empty groups', async () => {
      expect(await asyncUw(asyncTestSpliterator([split]))).toEqual([[], []]);
    });
  });

  describe('when spliterator contains two splits', () => {
    it('yields three empty groups', async () => {
      expect(await asyncUw(asyncTestSpliterator([split, split]))).toEqual([[], [], []]);
    });
  });

  describe('when spliterator contains a trailing split', () => {
    it('yields three empty groups', async () => {
      expect(await asyncUw(asyncTestSpliterator([null, split]))).toEqual([[null], []]);
    });
  });

  describe('when spliterator contains a leading split', () => {
    it('yields three empty groups', async () => {
      expect(await asyncUw(asyncTestSpliterator([split, null]))).toEqual([[], [null]]);
    });
  });

  describe('abrupt termination', () => {
    // The assertions in these tests are part of the cleanup defined by $wrap
    const source = ['first', split, 'second'];

    it("source is cleaned up if we're done before we started", async () => {
      const parts = asyncTestSpliterator(asyncWrap(source));
      await parts.return();
    });

    it('source is cleaned up if part manager is closed then active part', async () => {
      const parts = asyncTestSpliterator(asyncWrap(source));
      const part = (await parts.next()).value;
      await part.next();
      await parts.return();
      await part.return();
    });

    it('source is cleaned up if active part is closed then part manager', async () => {
      const parts = asyncTestSpliterator(asyncWrap(source));
      const part = (await parts.next()).value;
      await part.next();
      await part.return();
      await parts.return();
    });

    it('source is cleaned up if active part is done then part manager is closed', async () => {
      const parts = asyncTestSpliterator(asyncWrap(source));
      const part = (await parts.next()).value;
      await part.next();
      await part.next();
      await parts.return();
    });

    it('source is cleaned up if part manager is closed then active part is done', async () => {
      const parts = asyncTestSpliterator(asyncWrap(source));
      const part = (await parts.next()).value;
      await parts.return();
      await part.next();
      await part.next();
    });

    it('source is cleaned up if only parts are consumed', async () => {
      const parts = asyncTestSpliterator(asyncWrap(source));
      await parts.next();
      await parts.next();
      await parts.next();
    });
  });
});
