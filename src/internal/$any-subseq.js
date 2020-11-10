import { $async, $await } from '../../generate/async.macro';

import { $ensureIterable } from './$iterable';
import { $toArray } from '../methods/$to-array/$to-array';
import { $map } from '../methods/$map/$map';

$async;
export function $subseqsToArray(values) {
  return $await(
    $toArray($map(values, value => $toArray($ensureIterable(value))), arr => arr.length > 0),
  );
}
