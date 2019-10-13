import { wrapWithMethodIterable } from '../../internal/iterable';

export function* repeat(n, item) {
  while (n--) {
    yield item;
  }
}

export default wrapWithMethodIterable(repeat, {
  validateArgs(args) {
    if (args.length === 0) {
      throw new Error('Required `item` argument to `repeat` not specified');
    } else if (args.length === 1) {
      args.unshift(Infinity);
    } else if (args[0] === undefined) {
      args[0] = Infinity;
    }
  },
});
