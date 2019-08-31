import { wrapWithMethodIterable } from '../../internal/iterable';

export function* range(start, end, step = 1) {
  for (let i = start; step > 0 ? i < end : i > end; i += step) {
    yield i;
  }
}

export default wrapWithMethodIterable(range, {
  validateArgs(args) {
    let [optsOrEndOrStart, end = Infinity, step = 1] = args;
    let start = 0;

    if (typeof optsOrEndOrStart === 'number') {
      if (args.length > 1) {
        start = optsOrEndOrStart;
      } else {
        end = optsOrEndOrStart;
      }
    } else if (optsOrEndOrStart && typeof optsOrEndOrStart === 'object') {
      ({ start = 0, end = Infinity, step = 1 } = optsOrEndOrStart);
    }

    if (typeof start !== 'number') {
      throw new TypeError('The specified start was not a number');
    }

    if (typeof end !== 'number') {
      throw new TypeError('The specified end was not a number');
    }

    if (typeof step !== 'number' || step === 0) {
      throw new TypeError('The specified step was not a number !== 0');
    }

    args[0] = start;
    args[1] = end;
    args[2] = step;
  },
});
