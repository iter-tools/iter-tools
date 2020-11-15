import { $iterableCurry } from '../../internal/$iterable';
import { $map } from '../$map/$map';

export function $enumerate(source, start = 0) {
  return $map(source, (value, i) => [start + i, value]);
}

export default $iterableCurry($enumerate, {
  minArgs: 0,
  maxArgs: 1,
});
