import { iterableCurry } from '../../internal/iterable';
import { stringSplitOnAny } from '../$split-on-any/internal/string-split-on-any';
import { iterableSplitOnAnySubseq } from './internal/iterable-split-on-any-subseq';

export function splitOnAnySubseq(source, separatorSubseqs, equals = Object.is) {
  return typeof source === 'string'
    ? stringSplitOnAny(source, separatorSubseqs, equals)
    : iterableSplitOnAnySubseq(source, separatorSubseqs, equals);
}

export default iterableCurry(splitOnAnySubseq, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
