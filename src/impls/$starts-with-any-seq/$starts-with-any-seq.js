import { $isSync, $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry, $ensureIterable } from '../../internal/$iterable.js';
import { $__zipAll } from '../$zip-all/$zip-all.js';
import { $__peekerate } from '../$peekerate/$peekerate.js';

const none = Symbol('none');

$async;
export function $_startsWithAnySeq(peekr, subseqPeekr, same) {
  if (subseqPeekr.done || subseqPeekr.value.includes(none)) return true;

  const matches = subseqPeekr.value.map(() => true);

  while (!peekr.done && !subseqPeekr.done) {
    const { value } = peekr; // the value to match
    const { value: seqValue } = subseqPeekr;

    for (let i = 0; i < seqValue.length; i++) {
      if (!matches[i]) continue;
      if (seqValue[i] === none) {
        return true;
      } else {
        matches[i] = same(seqValue[i], value);
      }
    }
    if ($isSync) {
      subseqPeekr.advance();
      peekr.advance();
    } else {
      $await(Promise.all([subseqPeekr.advance(), peekr.advance()]));
    }
  }

  return subseqPeekr.done && matches.includes(true);
}

$async;
export function $__startsWithAnySeq(iterable, seqs, same = Object.is) {
  if (!seqs.length) return false;
  const peekr = $await($__peekerate(iterable));
  const subseqPeekr = $await($__peekerate($__zipAll(seqs, { filler: none })));

  const seqFound = $await($_startsWithAnySeq(peekr, subseqPeekr, same));

  $await(subseqPeekr.return());
  $await(peekr.return());

  return seqFound;
}

export const $startsWithAnySeq = /*#__PURE__*/ $iterableCurry($__startsWithAnySeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    args[1] = args[1].map((arg) => $ensureIterable(arg));
  },
});
