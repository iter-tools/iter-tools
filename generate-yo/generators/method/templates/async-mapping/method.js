import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* ____method__(source) {
  for await (const value of source) {
    yield value;
  }

  throw new Error('Dummy implementation');
}

export const __method__ = asyncIterableCurry(____method__);
