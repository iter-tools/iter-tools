import { $async, $await } from '../../generate/async.macro.cjs';

import { $ensureIterable } from './$iterable.js';
import { $toArray } from '../impls/$to-array/$to-array.js';
import { $map } from '../impls/$map/$map.js';

$async;
export function $seqsToArray(values) {
  return $await(
    $toArray(
      $map(values, (value) => $toArray($ensureIterable(value))),
      (arr) => arr.length > 0,
    ),
  );
}
