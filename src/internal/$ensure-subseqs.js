import { $isSync, $async } from '../../generate/async.macro';

import $toArray from '../methods/$to-array/$to-array';
import $map from '../methods/$map/$map';

export function $ensureSubseqs(valueSubseqs) {
  return $toArray(
    $map(
      $async(value => {
        if ($isSync) {
          return $isSync && typeof value === 'string' ? value : $toArray(value);
        } else {
          return $toArray(value);
        }
      }),
      valueSubseqs,
    ),
  );
}
