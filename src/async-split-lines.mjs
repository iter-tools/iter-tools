import asyncRegExpSplitIter from './async-regexp-split-iter'

export default asyncRegExpSplitIter(/(\r\n|[\n\v\f\r\x85\u2028\u2029])/g)
