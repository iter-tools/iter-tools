var iterators = require('require-all')(__dirname + '/lib');

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toLowerCapitalize(str) { // from zip-longest to zipLongest
  return str.split('-').map((s, index) => {
    if (index) {
      return capitalize(s);
    }
    return s;
  })
  .join('');
}

Object.keys(iterators)
.forEach(function (name) {
  var alternateName = toLowerCapitalize(name);
  if (name !== alternateName) {
    iterators[alternateName] = iterators[name];
  }
});

module.exports = iterators;
