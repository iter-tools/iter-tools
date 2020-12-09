import { iterableCurry } from '../../internal/iterable.js';

export function ____method__(iterable) {
  let _item;

  for (const item of iterable) {
    _item = item;
  }

  throw new Error('Dummy implementation');
}

export const __method__ = iterableCurry(____method__, {
  reduces: true,
});
