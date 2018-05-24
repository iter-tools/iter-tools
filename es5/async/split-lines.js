'use strict';

var asyncRegExpSplitIter = require('./regexp-split-iter');

module.exports = asyncRegExpSplitIter(/(\r\n|[\n\v\f\r\x85\u2028\u2029])/g);