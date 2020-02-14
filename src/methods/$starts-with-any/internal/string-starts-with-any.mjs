import { stringStartsWith } from '../../$starts-with/internal/string-starts-with';

export function stringStartsWithAny(str, substrs, compare) {
  for (const substr of substrs) {
    if (stringStartsWith(str, substr, compare)) return true;
  }

  return false;
}
