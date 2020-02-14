import { stringIndexOf } from '../../$includes/internal/string-index-of';

export function stringIncludesAny(str, substrs, compare) {
  for (const substr of substrs) {
    if (stringIndexOf(str, substr, compare) >= 0) return true;
  }

  return false;
}
