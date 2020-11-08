/**
 * @generated-from ./spliterate-grouped.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { spliterateGrouped } from '../../..';
import { unwrapDeep as uw } from '../../../__tests__/helpers';
import { split } from '../spliterate-grouped';

function* identityStrategy(_split: any, _options: any, source: any) {
  yield* source;
}

describe('spliterateGrouped', () => {
  const testSpliterator = spliterateGrouped(identityStrategy, {});

  describe('when spliterator is empty', () => {
    it('yields no groups', () => {
      expect(uw(testSpliterator([]))).toEqual([]);
    });
  });

  describe('when spliterator contains only a split', () => {
    it('yields two empty groups', () => {
      expect(uw(testSpliterator([split, 'key']))).toEqual([['key', []]]);
    });
  });

  describe('when spliterator contains two splits', () => {
    it('yields three empty groups', () => {
      expect(uw(testSpliterator([split, 'key1', split, 'key2']))).toEqual([
        ['key1', []],
        ['key2', []],
      ]);
    });
  });
});
