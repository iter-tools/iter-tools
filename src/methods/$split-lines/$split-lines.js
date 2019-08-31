import $regExpSplitIter from '../$regexp-split-iter/$regexp-split-iter';

export const splitLines = $regExpSplitIter(/(\r\n|[\n\v\f\r\x85\u2028\u2029])/g);

export default splitLines;
