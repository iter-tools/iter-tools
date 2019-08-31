import { cloneRegexp, isRegExp } from '../../internal/regexp';
import { stringCurry } from '../../internal/string';

export function* regexpExec(re, str) {
  if (typeof re === 'string') {
    re = new RegExp(re, 'g');
  }

  if (!re.sticky && !re.global) {
    re = cloneRegexp(re, { global: true });
  }
  let match;
  while ((match = re.exec(str)) !== null) {
    yield match;
  }
}

export default stringCurry(regexpExec, {
  validateArgs([re]) {
    if (!isRegExp(re)) {
      throw new TypeError('regexpExec: the first argument can be a string or a regular expression');
    }
  },
});
