const orInifity = value => (value === -1 ? Infinity : value);

function findNext(str, separatorStrings, start = 0) {
  let index = Infinity;
  let size = null;

  for (const separatorString of separatorStrings) {
    if (str.indexOf(separatorString, start) < index) {
      size = separatorString.length;
    }
    index = Math.min(orInifity(str.indexOf(separatorString, start)), index);
  }
  return index === Infinity ? null : { index, size };
}

export function* stringSplitOnAny(str, separatorStrings) {
  if (str === '') return;

  let match = {
    index: 0,
    size: 0,
  };
  let nextMatch;
  while ((nextMatch = findNext(str, separatorStrings, match.index + match.size))) {
    yield str.slice(match.index + match.size, nextMatch.index);
    match = nextMatch;
  }
  yield str.slice(match.index + match.size);
}
