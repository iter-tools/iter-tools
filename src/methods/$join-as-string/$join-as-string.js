import { $ensureIterable } from '../../internal/$iterable';
import { $joinAsStringWith } from '../$join-as-string-with/$join-as-string-with';

export function $joinAsString(source) {
  return $joinAsStringWith($ensureIterable(source), '');
}

export default $joinAsString;
