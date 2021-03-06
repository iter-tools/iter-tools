/**
 * @generated-from ./$split-groups.test.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncSplitGroups } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap, asyncUnwrapDeep } from '../../../test/async-helpers.js';

async function identity<T>(value: T): Promise<T> {
  return value;
}

describe('asyncSplitGroups', () => {
  describe('when source is empty', () => {
    it('yields no groups', async () => {
      expect(await asyncUnwrapDeep(asyncSplitGroups(identity, null))).toEqual([]);
      expect(await asyncUnwrapDeep(asyncSplitGroups(identity, undefined))).toEqual([]);
      expect(await asyncUnwrapDeep(asyncSplitGroups(identity, asyncWrap([])))).toEqual([]);
    });
  });

  describe('when values from source cannot be grouped', () => {
    it('yields a group for each value', async () => {
      expect(
        await asyncUnwrapDeep(
          asyncSplitGroups(async (_: number, i: number) => i, asyncWrap([0, 0, 0])),
        ),
      ).toEqual([
        [0, [0]],
        [1, [0]],
        [2, [0]],
      ]);
    });
  });

  describe('when source contains subsequent values belonging to the same group', () => {
    it('coalesces values into groups', async () => {
      const lowerCase = async (value: string) => value.toLowerCase();
      expect(await asyncUnwrapDeep(asyncSplitGroups(lowerCase, 'AaA'))).toEqual([
        ['a', ['A', 'a', 'A']],
      ]);
      expect(await asyncUnwrapDeep(asyncSplitGroups(lowerCase, 'baA'))).toEqual([
        ['b', ['b']],
        ['a', ['a', 'A']],
      ]);
    });
  });

  describe('asyncWhen getKey is omitted', () => {
    it('coalesces values into groups', async () => {
      expect(await asyncUnwrapDeep(asyncSplitGroups('aaa'))).toEqual([['a', ['a', 'a', 'a']]]);
      expect(await asyncUnwrapDeep(asyncSplitGroups('bbabb'))).toEqual([
        ['b', ['b', 'b']],
        ['a', ['a']],
        ['b', ['b', 'b']],
      ]);
    });
  });

  describe('when groups are consumed out of order', () => {
    it('throws', async () => {
      const iter = asyncSplitGroups(identity, 'AB');
      const [, As] = (await iter.next()).value;
      const [, Bs] = (await iter.next()).value;

      asyncUnwrap(Bs);

      expect(
        await (async () => {
          try {
            await asyncUnwrap(As);
          } catch (e) {
            return e;
          }
        })(),
      ).toMatchSnapshot();
    });
  });
});
