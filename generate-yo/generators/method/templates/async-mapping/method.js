import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* ____method__(source) {
  for await (const item of source) {
    yield item;
  }

  throw new Error('Dummy implementation');
}

export const __method__ = asyncIterableCurry(____method__);
