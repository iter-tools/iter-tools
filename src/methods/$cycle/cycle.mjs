import { iterableCurry } from '../../internal/iterable';

export function* cycle(iterable, n = Infinity) {
  while (n--) {
    yield* iterable;
  }
}

export default iterableCurry(cycle, {
  minArgs: 0,
  maxArgs: 1,
  validateArgs(args) {
    if (!Array.isArray(args[1])) {
      args[1] = [...args[1]];
    }
  },
});
