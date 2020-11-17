import { $iterableCurry } from '../../internal/$iterable.js';
import { $map } from '../$map/$map.js';

export function $enumerate(source, start = 0) {
  return $map(source, (value, i) => [start + i, value]);
}

export default /*#__PURE__*/ $iterableCurry($enumerate, {
  minArgs: 0,
  maxArgs: 1,
});
