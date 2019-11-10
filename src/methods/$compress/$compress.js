import $zip from '../$zip/$zip';
import { $filter } from '../$filter/$filter';
import { $map } from '../$map/$map';

export function $compress(source, included) {
  return $map($filter($zip(source, included), entry => entry[1]), entry => entry[0]);
}

export default $compress;
