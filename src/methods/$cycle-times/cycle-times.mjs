import { iterableCurry } from '../../internal/iterable';

export function* cycleTimes(source, n) {
  if (!source.length) return;

  while (n--) {
    yield* source;
  }
}

export default iterableCurry(cycleTimes, {
  validateArgs(args) {
    if (!Array.isArray(args[1])) {
      args[1] = [...args[1]];
    }
  },
});
