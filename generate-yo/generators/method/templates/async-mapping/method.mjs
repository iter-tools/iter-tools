import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* __method__(source) {
  for await (const item of source) {
    yield item;
  }

  throw new Error('Dummy implementation');
}

export default asyncIterableCurry(__method__);
