import { cloneRegexp, isRegExp } from '../../internal/regexp';
import { stringCurry } from '../../internal/string';

export function* regexpExec(str, regexp) {
  if (typeof regexp === 'string') {
    regexp = new RegExp(regexp, 'g');
  }

  if (!regexp.sticky && !regexp.global) {
    regexp = cloneRegexp(regexp, { global: true });
  }
  let match;
  while ((match = regexp.exec(str)) !== null) {
    yield match;
  }
}

export default stringCurry(regexpExec, {
  validateArgs([regexp]) {
    if (!isRegExp(regexp)) {
      throw new TypeError('regexpExec: the first argument can be a string or a regular expression');
    }
  },
});
