/**
 * @generated-from ./$equal.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable';
import { zipAll } from '../$zip-all/zip-all';
import { simpleSlice } from '../$slice/slice';

const noItem = {};
const zipAllConfig = { filler: noItem };

export function equal(iterables) {
  if (iterables.length <= 1) {
    return true;
  }

  const wrappedIterables = iterables;

  for (const allItems of zipAll(wrappedIterables, zipAllConfig)) {
    const firstItem = allItems[0];
    for (const item of simpleSlice(allItems, 1, Infinity)) {
      if (item !== firstItem) {
        return false;
      }
    }
  }

  return true;
}

export default iterableCurry(equal, {
  reduces: true,
  variadic: true,
});
