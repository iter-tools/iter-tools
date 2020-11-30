import { iterableCurry } from '../../internal/iterable.js';

export function __method__(iterable) {
  let _item;

  for (const item of iterable) {
    _item = item;
  }

  throw new Error('Dummy implementation');
}

export default iterableCurry(__method__, {
  reduces: true,
});
