'use strict';

var regExpSplitIter = require('./regexp-split-iter');

module.exports = regExpSplitIter(/(\r\n|[\n\v\f\r\x85\u2028\u2029])/g);