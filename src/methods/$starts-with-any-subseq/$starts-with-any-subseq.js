import { $isSync, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $ensureSubseqs } from '../../internal/$ensure-subseqs';
import { $zipAll } from '../$zip-all/$zip-all';
import { simpleSlice } from '../$slice/slice';
import { $wrap } from '../$wrap/$wrap';

const none = {};
const zipAllConfig = { filler: none };

$async;
export function $startsWithAnySubseq(iterable, valueSubseqs, equals = Object.is) {
  const valueArrays = $await($ensureSubseqs(valueSubseqs));
  const states = valueArrays.map(_ => ({
    matches: true,
    done: false,
  }));

  $await;
  for (const allItems of $zipAll(
    [iterable, ...($isSync ? valueArrays : valueArrays.map($wrap))],
    zipAllConfig,
  )) {
    const item = allItems[0];
    let i = -1;
    let allDone = true;
    let anyMatched = false;

    for (const subseqItem of simpleSlice(allItems, 1, Infinity)) {
      const state = states[++i];
      state.done = subseqItem === none;
      state.matches = state.matches && equals(subseqItem, item);
      allDone = allDone && state.done;
      anyMatched = anyMatched || state.matches;
    }

    if (allDone) break;
    if (!anyMatched) return false;
  }

  return true;
}

export default $iterableCurry($startsWithAnySubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
