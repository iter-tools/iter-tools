import { $async, $await } from '../../generate/async.macro.cjs';

import { $ensureIterable } from './$iterable.js';
import { $__toArray } from '../impls/$to-array/$to-array.js';
import { $__map } from '../impls/$map/$map.js';

$async;
export function $seqsToArray(values) {
  return $await(
    $__toArray(
      $__map(values, (value) => $__toArray($ensureIterable(value))),
      (arr) => arr.length > 0,
    ),
  );
}
