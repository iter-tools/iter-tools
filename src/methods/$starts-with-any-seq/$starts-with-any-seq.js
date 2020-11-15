import { $isSync, $async, $await } from '../../../generate/async.macro';

import { $iterableCurry, $ensureIterable } from '../../internal/$iterable';
import { $zipAll } from '../$zip-all/$zip-all';
import { $peekerate } from '../$peekerate/$peekerate';

const none = Symbol('none');

$async;
export function $startsWithAnySubseq_(peekr, subseqPeekr) {
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
        matches[i] = matches[i] && seqValue[i] === value;
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
export function $startsWithAnySeq(iterable, seqs) {
  if (!seqs.length) return false;
  const peekr = $await($peekerate(iterable));
  const subseqPeekr = $await($peekerate($zipAll(seqs, { filler: none })));

  const seqFound = $await($startsWithAnySubseq_(peekr, subseqPeekr));

  $await(subseqPeekr.return());
  $await(peekr.return());

  return seqFound;
}

export default $iterableCurry($startsWithAnySeq, {
  reduces: true,
  validateArgs(args) {
    args[0] = args[0].map(arg => $ensureIterable(arg));
  },
});
