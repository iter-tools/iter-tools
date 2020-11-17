import { iterableCurry } from '../../internal/iterable.js';

export function* cycleTimes(source, n) {
  if (!source.length) return;

  while (n--) {
    yield* source;
  }
}

export default /*#__PURE__*/ iterableCurry(cycleTimes, {
  validateArgs(args) {
    if (!Array.isArray(args[1])) {
      args[1] = [...args[1]];
    }
  },
});
