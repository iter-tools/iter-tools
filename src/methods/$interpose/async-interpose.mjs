/**
 * @generated-from ./$interpose.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncInterposeSeq } from '../$interpose-seq/async-interpose-seq';

export function asyncInterpose(source, value) {
  return asyncInterposeSeq(source, [value]);
}

export default asyncIterableCurry(asyncInterpose, {
  validateArgs(args) {},
});
