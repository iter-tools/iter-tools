import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function __method__(iterable) {
  let _item;

  for await (const item of iterable) {
    _item = item;
  }

  throw new Error('Dummy implementation');
}

export default asyncIterableCurry(__method__, {
  reduces: true,
});
