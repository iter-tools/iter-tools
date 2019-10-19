/**
 * @generated-from ./async-consume.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncConsume } from '../../..';
describe('asyncConsume', () => {
  it('consumes an iterable', async () => {
    const arr: Array<number> = [];
    await asyncConsume(item => arr.push(item), [1, 2, 3]);
    expect(arr).toEqual([1, 2, 3]);
  });
  it('consumes an iterable using a promise', async () => {
    const arr: Array<number> = [];
    await asyncConsume(
      item => {
        arr.push(item);
        return Promise.resolve(0);
      },
      [1, 2, 3],
    );
    expect(arr).toEqual([1, 2, 3]);
  });
  it('consumes an iterable (curried)', async () => {
    const arr: Array<number> = [];
    const consumePush = asyncConsume((item: number) => arr.push(item));
    await consumePush([1, 2, 3]);
    expect(arr).toEqual([1, 2, 3]);
  });
});
