import { iterableCurry } from '../../internal/iterable';
import { stringSplitOnAny } from '../$split-on-any/internal/string-split-on-any';
import { iterableSplitOnAnySubseq } from './internal/iterable-split-on-any-subseq';

export function splitOnAnySubseq(source, separatorSubseqs) {
  return typeof source === 'string'
    ? stringSplitOnAny(source, separatorSubseqs)
    : iterableSplitOnAnySubseq(source, separatorSubseqs);
}

export default iterableCurry(splitOnAnySubseq);
