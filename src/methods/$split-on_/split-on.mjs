import iterableSplitOn from './iterable-split-on';
import stringSplitOn from './string-split-on';

function splitOn(iterable, options, on) {
  return typeof iterable === 'string'
    ? stringSplitOn(iterable, options, on)
    : iterableSplitOn(iterable, options, on);
}

export default splitOn;
