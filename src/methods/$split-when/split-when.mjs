/**
 * @generated-from ./$split-when.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable';
import { Bisector } from '../../internal/bisector';
import { wrap } from '../../internal/wrap';

export function* conditionStrategy(split, { predicate }, source) {
  let i = 0;
  let splat = false;
  for (const value of source) {
    if (!splat && predicate(value, i++)) {
      yield split;
      splat = true;
    }
    yield value;
  }
}

export function splitWhen(source, predicate) {
  return wrap(new Bisector(source, conditionStrategy, { predicate }));
}

export default iterableCurry(splitWhen, {
  forceSync: true,
});