import { wrap } from '../$wrap/wrap';

const orInifity = value => (value === -1 ? Infinity : value);

function findNext(str, onStrings, start = 0) {
  let index = Infinity;
  let size = null;

  for (const onString of onStrings) {
    if (str.indexOf(onString, start) < index) {
      size = onString.length;
    }
    index = Math.min(orInifity(str.indexOf(onString, start)), index);
  }
  return index === Infinity ? null : { index, size };
}

function* stringSplitOn(str, { any }, on) {
  const onStrings = any ? [...wrap(on)] : [on];

  if (str === '') return;

  let match = {
    index: 0,
    size: 0,
  };
  let nextMatch;
  while ((nextMatch = findNext(str, onStrings, match.index + match.size))) {
    yield str.slice(match.index + match.size, nextMatch.index);
    match = nextMatch;
  }
  yield str.slice(match.index + match.size);
}

export default stringSplitOn;
