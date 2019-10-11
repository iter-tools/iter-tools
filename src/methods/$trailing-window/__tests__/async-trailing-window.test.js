/**
 * @generated-from ./$trailing-window.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars,import/no-duplicates,no-constant-condition */

import { asyncUnwrapDeep as asyncUw } from '../../../__tests__/async-helpers';
import { asyncTrailingWindow } from '../../..';
describe('asyncTrailingWindow', () => {
  const _12345 = Object.freeze([1, 2, 3, 4, 5]);

  it('frames iterable', async () => {
    const result = [[undefined, undefined, 1], [undefined, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5]];
    expect(await asyncUw(asyncTrailingWindow(3, _12345))).toEqual(result);
    const opts: any = {
      size: 3,
    };
    expect(await asyncUw(asyncTrailingWindow(opts, _12345))).toEqual(result);
  });
  it('frames iterable (use filler)', async () => {
    const result = [['x', 'x', 1], ['x', 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5]];
    expect(
      await asyncUw(
        asyncTrailingWindow(
          3,
          {
            filler: 'x',
          },
          _12345,
        ),
      ),
    ).toEqual(result);
    const opts: any = {
      size: 3,
      filler: 'x',
    };
    expect(await asyncUw(asyncTrailingWindow(opts, _12345))).toEqual(result);
  });
  it('frames iterable (window equal to the sequence)', async () => {
    expect(await asyncUw(asyncTrailingWindow(5, _12345))).toEqual([
      [undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, 1, 2],
      [undefined, undefined, 1, 2, 3],
      [undefined, 1, 2, 3, 4],
      [1, 2, 3, 4, 5],
    ]);
  });
  it('frames iterable (window bigger than the sequence)', async () => {
    expect(await asyncUw(asyncTrailingWindow(6, _12345))).toEqual([
      [undefined, undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, undefined, 1, 2],
      [undefined, undefined, undefined, 1, 2, 3],
      [undefined, undefined, 1, 2, 3, 4],
      [undefined, 1, 2, 3, 4, 5],
    ]);
  });
  it('frames iterable (window bigger than the sequence) with filler', async () => {
    expect(
      await asyncUw(
        asyncTrailingWindow(
          6,
          {
            filler: 'x',
          },
          _12345,
        ),
      ),
    ).toEqual([
      ['x', 'x', 'x', 'x', 'x', 1],
      ['x', 'x', 'x', 'x', 1, 2],
      ['x', 'x', 'x', 1, 2, 3],
      ['x', 'x', 1, 2, 3, 4],
      ['x', 1, 2, 3, 4, 5],
    ]);
  });
  it('frames iterable (window bigger than the sequence)', async () => {
    expect(await asyncUw(asyncTrailingWindow(7, [1, 2, 3, 4, 5]))).toEqual([
      [undefined, undefined, undefined, undefined, undefined, undefined, 1],
      [undefined, undefined, undefined, undefined, undefined, 1, 2],
      [undefined, undefined, undefined, undefined, 1, 2, 3],
      [undefined, undefined, undefined, 1, 2, 3, 4],
      [undefined, undefined, 1, 2, 3, 4, 5],
    ]);
  });
});
