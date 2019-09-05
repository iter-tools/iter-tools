import iterableIncludes from './iterable-includes';
import stringIncludes from './string-includes';

function includes(iterable, config, value) {
  return typeof iterable === 'string'
    ? stringIncludes(iterable, config, value)
    : iterableIncludes(iterable, config, value);
}

export default includes;
