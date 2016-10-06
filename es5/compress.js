'use strict';

var zip = require('./zip');
var filter = require('./filter');
var map = require('./map');

function compress(iterable, compress) {
  var _map = map(function (couple) {
    return couple[0];
  });
  var _filter = filter(function (couple) {
    return couple[1];
  });
  return _map(_filter(zip(iterable, compress)));
}

module.exports = compress;