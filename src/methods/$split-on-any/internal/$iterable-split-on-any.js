import toArray from '../../$to-array/to-array';
import { $iterableSplitWith } from '../../$split-with/internal/$iterable-split-with';

export function $iterableSplitOnAny(source, separators) {
  const _separators = toArray(separators);

  return $iterableSplitWith(source, value => _separators.includes(value));
}
