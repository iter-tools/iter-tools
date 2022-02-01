/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$zip.js#1643837503119
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';
import { parallelEach } from '../../internal/parallel-each.js';
import { __peekerate } from '../$peekerate/peekerate.js';
import { __map } from '../$map/map.js';
import { __some } from '../$some/some.js';
import { __toArray } from '../$to-array/to-array.js';

const isDone = (peekr) => peekr.done;

export function* __zip(sources) {
  const peekrs = __toArray(__map(sources, __peekerate));
  let done = __some(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value }) => value);

      for (const peekr of peekrs) peekr.advance();

      done = __some(peekrs, isDone);
    }
  } finally {
    parallelEach(peekrs, (peekr) => peekr.return());
  }
}

export const zip = /*#__PURE__*/ iterableCurry(__zip, {
  variadic: true,
});
