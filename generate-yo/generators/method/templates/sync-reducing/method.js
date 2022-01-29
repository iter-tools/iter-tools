import { iterableCurry } from '../../internal/iterable.js';

export function ____method__(iterable) {
  let _value;

  for (const value of iterable) {
    _value = value;
  }

  throw new Error('Dummy implementation');
}

export const __method__ = iterableCurry(____method__, {
  reduces: true,
});
