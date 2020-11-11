import { $async, $await } from '../../../generate/async.macro';

import $toAnySubseq from '../../internal/$to-any-subseq';
import { $zipAll } from '../$zip-all/$zip-all';
import { simpleSlice } from '../$slice/slice';

const noItem = {};
const zipAllConfig = { filler: noItem };

$async;
export function $iterableStartsWith_(iterable, config, value) {
  const subseqs = $await($toAnySubseq(config, value));
  const states = subseqs.map(_ => ({
    matches: true,
    done: false,
  }));

  $await;
  for (const allItems of $zipAll([iterable, ...subseqs], zipAllConfig)) {
    const item = allItems[0];
    let i = -1;
    let allDone = true;
    let anyMatched = false;

    for (const subseqItem of simpleSlice(allItems, 1, Infinity)) {
      const state = states[++i];
      state.done = subseqItem === noItem;
      state.matches = state.matches && subseqItem === item;
      allDone = allDone && state.done;
      anyMatched = anyMatched || state.matches;
    }

    if (allDone) break;
    if (!anyMatched) return false;
  }

  return true;
}
