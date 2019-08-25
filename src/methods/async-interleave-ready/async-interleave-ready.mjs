import asyncInterleave from '../$interleave/async-interleave';

async function* asyncInterleaveReady(_, canTakeAny) {
  let buffer;
  while ((buffer = await canTakeAny())) yield await buffer.take();
}

// Pass empty options to ensure there's no chance currying would cause
// an invalid iterable to instead be bound as the options argument.
const emptyOptions = {};
export default asyncInterleave(asyncInterleaveReady, emptyOptions);
