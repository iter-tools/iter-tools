/**
 * @generated-from ./$split-on.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable';
import asyncInternalSplitOn from '../$split-on_/async-split-on';
const config = {
  any: false,
  subseq: false,
};

function asyncSplitOn(iterable, value) {
  return asyncInternalSplitOn(iterable, config, value);
}

export default asyncIterableCurry(asyncSplitOn);
