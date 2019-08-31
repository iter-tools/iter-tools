import $zip from '../$zip/$zip';
import { $filter } from '../$filter/$filter';
import { $map } from '../$map/$map';

export function $compress(iterable, compress) {
  return $map(entry => entry[0], $filter(entry => entry[1], $zip(iterable, compress)));
}

export default $compress;
