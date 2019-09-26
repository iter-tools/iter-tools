import { iterableSplitOn_ } from './iterable-split-on_';
import { stringSplitOn_ } from './string-split-on_';

export function splitOn_(iterable, options, on) {
  return typeof iterable === 'string'
    ? stringSplitOn_(iterable, options, on)
    : iterableSplitOn_(iterable, options, on);
}
