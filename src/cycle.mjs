import { ensureIterable, wrapWithMethodIterable } from './internal/iterable';

function* cycle(iterable) {
  if (Array.isArray(iterable)) {
    while (true) {
      yield* iterable;
    }
  } else {
    yield* cycle([...ensureIterable(iterable)]);
  }
}

export default wrapWithMethodIterable(cycle);
