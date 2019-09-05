import { $async, $await } from '../../generate/async.macro';

import { toArray as syncToArray } from '../methods/$to-array/to-array';
import { $toArray } from '../methods/$to-array/$to-array';
import { $map } from '../methods/$map/$map';

$async;
function toAnySubseq({ any, subseq }, value) {
  const values = any ? syncToArray(value) : [value];
  const subseqs = $await(
    $toArray(
      $map(values, value =>
        subseq ? (typeof value === 'string' ? value : $toArray(value)) : [value],
      ),
    ),
  );

  return subseqs;
}

export default toAnySubseq;
