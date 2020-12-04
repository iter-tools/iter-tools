import { $zip } from '../$zip/$zip.js';
import { $__filter } from '../$filter/$filter.js';
import { $__map } from '../$map/$map.js';

export function $__compress(source, included) {
  return $__map(
    $__filter($zip(source, included), (entry) => entry[1]),
    (entry) => entry[0],
  );
}

export const $compress = $__compress;
