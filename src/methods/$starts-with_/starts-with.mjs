import iterableStartsWith from './iterable-starts-with';
import stringStartsWith from './string-starts-with';

function startsWith(iterable, config, value) {
  return typeof iterable === 'string'
    ? stringStartsWith(iterable, config, value)
    : iterableStartsWith(iterable, config, value);
}

export default startsWith;
