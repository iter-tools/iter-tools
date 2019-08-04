import asyncInterleave from './async-interleave';

async function* asyncInterleaveReady(_, canTakeAny) {
  let buffer;
  while ((buffer = await canTakeAny())) yield await buffer.take();
}

export default asyncInterleave(asyncInterleaveReady, {});
