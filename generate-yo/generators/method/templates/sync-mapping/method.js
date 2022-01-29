import { iterableCurry } from '../../internal/iterable.js';

export function* ____method__(source) {
  for (const value of source) {
    yield value;
  }

  throw new Error('Dummy implementation');
}

export const __method__ = iterableCurry(____method__);
