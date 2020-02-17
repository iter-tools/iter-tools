import { stringIndexOf } from '../../$includes/internal/string-index-of';

export function stringIncludesAny(str, substrs, compareEquality) {
  for (const substr of substrs) {
    if (stringIndexOf(str, substr, compareEquality) >= 0) return true;
  }

  return false;
}
