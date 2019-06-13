/**
 * @generated-from ./$concat.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars */

import { $concat, $toArray, range } from './async-fns'
const $methodName = 'asyncConcat'
describe($methodName, () => {
  it('concats iterables', async () => {
    const iter = $concat(range({
      start: 1,
      end: 3
    }), [3, 4])
    expect((await $toArray(iter))).toEqual([1, 2, 3, 4])
  })
})
