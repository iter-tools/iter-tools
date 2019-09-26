import { iterableIncludes_ } from './iterable-includes_';
import { stringIncludes_ } from './string-includes_';

export function includes_(iterable, config, value) {
  return typeof iterable === 'string'
    ? stringIncludes_(iterable, config, value)
    : iterableIncludes_(iterable, config, value);
}
