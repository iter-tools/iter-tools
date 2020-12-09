import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function ____method__(iterable) {
  let _item;

  for await (const item of iterable) {
    _item = item;
  }

  throw new Error('Dummy implementation');
}

export const __method__ = asyncIterableCurry(____method__, {
  reduces: true,
});
