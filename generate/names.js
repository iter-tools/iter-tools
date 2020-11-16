'use strict';

const upper = /[A-Z]/;

function rename(name, ASYNC) {
  const a = upper.test(name[0]) ? 'A' : 'a';

  return ASYNC ? `${a}sync${name[0].toUpperCase()}${name.slice(1)}` : name;
}

function renameDollar(name, ASYNC) {
  return name[0] === '$' ? rename(name.slice(1), ASYNC) : name;
}

function syncName(name) {
  return name.startsWith('async')
    ? name[5].toLowerCase() + name.slice(6)
    : renameDollar(name, false);
}

function compareNames(a, b) {
  const aAsync = a.startsWith('async');
  const bAsync = b.startsWith('async');
  return aAsync && !bAsync ? 1 : bAsync && !aAsync ? -1 : a > b ? 1 : b > a ? -1 : 0;
}

function decamelize(str, separator) {
  separator = typeof separator === 'undefined' ? '_' : separator;

  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .toLowerCase();
}

module.exports = { rename, renameDollar, syncName, compareNames, decamelize };
