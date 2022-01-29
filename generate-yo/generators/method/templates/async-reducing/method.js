import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function ____method__(iterable) {
  let _value;

  for await (const value of iterable) {
    _value = value;
  }

  throw new Error('Dummy implementation');
}

export const __method__ = asyncIterableCurry(____method__, {
  reduces: true,
});
