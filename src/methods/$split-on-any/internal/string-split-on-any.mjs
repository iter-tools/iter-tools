import { stringIndexOf } from '../../$includes/internal/string-index-of';

function findNext(equals, str, separators, position = 0) {
  let index = Infinity;
  let size = null;

  for (const separator of separators) {
    const matchIndex = stringIndexOf(str, separator, equals, position);
    if (matchIndex >= 0 && matchIndex < index) {
      size = separator.length;
      index = matchIndex;
    }
  }
  return index === Infinity ? null : { index, size };
}

export function* stringSplitOnAny(str, separators, equals) {
  if (str === '') return;

  let match = {
    index: 0,
    size: 0,
  };
  let nextMatch;
  while ((nextMatch = findNext(equals, str, separators, match.index + match.size))) {
    yield str.slice(match.index + match.size, nextMatch.index);
    match = nextMatch;
  }
  yield str.slice(match.index + match.size);
}
