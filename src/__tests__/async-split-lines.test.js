/**
 * @generated-from ./$split-lines.test.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

/* eslint-disable no-unused-vars */

import { $splitLines, $toArray } from './async-fns'
const $methodName = 'asyncSplitLines'
describe($methodName, () => {
  it('should split 1', async () => {
    const iter = $splitLines(['aa', '\nb', 'cc'])
    expect((await $toArray(iter))).toEqual(['aa', 'bcc'])
  })
  it('should split 2', async () => {
    const iter = $splitLines(['aa\n', 'b ', 'cc\n'])
    expect((await $toArray(iter))).toEqual(['aa', 'b cc', ''])
  })
})
