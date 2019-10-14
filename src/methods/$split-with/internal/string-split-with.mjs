function findNextIndex(str, predicate, start = 0) {
  for (let i = start; i < str.length; i++) {
    if (predicate(str[i], i)) {
      return i;
    }
  }
  return -1;
}

function* stringSplitWith(str, predicate) {
  if (predicate instanceof RegExp) {
    yield* str.split(predicate);
    return;
  }

  let matchIndex = -1;
  let nextMatchIndex;
  while ((nextMatchIndex = findNextIndex(str, predicate, matchIndex + 1)) >= 0) {
    yield str.slice(matchIndex + 1, nextMatchIndex);
    matchIndex = nextMatchIndex;
  }
  yield str.slice(matchIndex + 1);
}

export default stringSplitWith;
