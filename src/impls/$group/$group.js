import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable.js';
import { $groupBy } from '../$group-by/$group-by.js';

export function group(iterable) {
  return $groupBy($ensureIterable(iterable), (_) => _);
}

export default $wrapWithResultIterable(group);
