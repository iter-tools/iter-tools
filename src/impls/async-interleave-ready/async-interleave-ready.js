import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { raceTo } from './internal/race-to.js';

export async function* __asyncInterleaveReady(sources) {
  const iterators = sources.map((iterable) => iterable[Symbol.asyncIterator]());

  const stepPromises = iterators.map((iter, idx) => iter.next().then((step) => ({ idx, step })));

  let ready;
  while ((ready = await raceTo(({ step }) => !step.done, null, stepPromises)) !== null) {
    const { idx, step } = ready;
    yield step.value;
    stepPromises[idx] = iterators[idx].next().then((step) => ({ idx, step }));
  }
}

export const asyncInterleaveReady = /*#__PURE__*/ asyncIterableCurry(__asyncInterleaveReady, {
  variadic: true,
});
