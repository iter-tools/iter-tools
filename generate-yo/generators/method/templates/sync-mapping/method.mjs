import { iterableCurry } from '../../internal/iterable';

export function* __method__(iterable) {
  for (const item of iterable) {
    yield item;
  }

  throw new Error('Dummy implementation');
}

export default iterableCurry(__method__);
