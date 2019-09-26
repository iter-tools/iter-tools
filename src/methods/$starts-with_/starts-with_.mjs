import { iterableStartsWith_ } from './iterable-starts-with_';
import { stringStartsWith_ } from './string-starts-with_';

export function startsWith_(iterable, config, value) {
  return typeof iterable === 'string'
    ? stringStartsWith_(iterable, config, value)
    : iterableStartsWith_(iterable, config, value);
}
