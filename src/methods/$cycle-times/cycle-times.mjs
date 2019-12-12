import { iterableCurry } from '../../internal/iterable';

export function* cycleTimes(iterable, n) {
  while (n--) {
    yield* iterable;
  }
}

export default iterableCurry(cycleTimes, {
  validateArgs(args) {
    if (!Array.isArray(args[1])) {
      args[1] = [...args[1]];
    }
  },
});
