import $zip from '../$zip/$zip';
import { $filter } from '../$filter/$filter';
import { $map } from '../$map/$map';

export function $compress(source, compress) {
  return $map($filter($zip(source, compress), entry => entry[1]), entry => entry[0]);
}

export default $compress;
