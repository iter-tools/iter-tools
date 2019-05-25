import regExpSplitIter from './$regexp-split-iter'

export default regExpSplitIter(/(\r\n|[\n\v\f\r\x85\u2028\u2029])/g)
