var compose = require('async-deco/utils/compose');
var measureSpeedSync = require('measure-speed').measureSpeedSync;
var range = require('../lib/range');
var filter = require('../lib/filter');
var map = require('../lib/map');
var reduce = require('../lib/reduce');
var regexpExec = require('../lib/regexp-exec');

function generateCurrentAccount(nlines) {
  var lines = [];
  lines.push('transaction id;businness code;money in;money out');
  for (var i = 0; i < nlines; i++) {
    lines.push(`${i};AAA123;${(Math.random() * 1000).toFixed(2)};${(Math.random() * 1000).toFixed(2)}`);
  }
  return lines.join('\n');
}

function matches2numbers(match) {
  return [parseFloat(match[1]), -parseFloat(match[2])];
}

function filterNegative(numbers) {
  return numbers[0] + numbers[1] > 0;
}


function lazy_regexp() {
  var csv = generateCurrentAccount(1000);

  var ms = measureSpeedSync(function () {
    var regIter = regexpExec(/^[0-9]+;[A-Z]{3}[0-9]*;([0-9.]*);([0-9.]*)/gm);
    var mapper = map(matches2numbers);
    var superIter = compose(filter(filterNegative), mapper, regIter);
    var res = reduce(superIter(csv), (acc, item) => acc + item[0] + item[1], 0);
  }, { samples: 1000, discard: 10 });

  console.log(ms);

  var ms = measureSpeedSync(function () {
    var re = /^[0-9]+;[A-Z]{3}[0-9]*;([0-9.]*);([0-9.]*)/gm;
    var transactions = [];
    var match;
    while (null !== (match = re.exec(csv))) {
      transactions.push(match);
    }
    var res = transactions.map(matches2numbers)
    .filter(filterNegative)
    .reduce((acc, item) => acc + item[0] + item[1], 0);
  }, { samples: 1000, discard: 10 });

  console.log(ms);
}

module.exports = {
  lazy_regexp: lazy_regexp,
};
