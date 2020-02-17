import { stringStartsWith } from '../../$starts-with/internal/string-starts-with';

export function stringStartsWithAny(str, substrs, compareEquality) {
  for (const substr of substrs) {
    if (stringStartsWith(str, substr, compareEquality)) return true;
  }

  return false;
}
