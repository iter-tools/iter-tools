import $zip from '../$zip/$zip';
import { $filter } from '../$filter/$filter';
import { $map } from '../$map/$map';

export function $compress(iterable, compress) {
  return $map($filter($zip(iterable, compress), entry => entry[1]), entry => entry[0]);
}

export default $compress;
