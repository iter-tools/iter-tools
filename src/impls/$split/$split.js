import { $map } from '../$map/$map.js';

function* iterableOf(item) {
  yield item;
}

export function $split(source) {
  return $map(source, (item) => iterableOf(item));
}

export default $split;
