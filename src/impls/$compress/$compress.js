import $zip from '../$zip/$zip.js';
import { $filter } from '../$filter/$filter.js';
import { $map } from '../$map/$map.js';

export function $compress(source, included) {
  return $map(
    $filter($zip(source, included), (entry) => entry[1]),
    (entry) => entry[0],
  );
}

export default $compress;
