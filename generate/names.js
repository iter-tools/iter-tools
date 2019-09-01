const upper = /[A-Z]/;

module.exports = {
  rename(name, ASYNC) {
    const a = upper.test(name[0]) ? 'A' : 'a';
    return ASYNC ? `${a}sync${name[0].toUpperCase()}${name.slice(1)}` : name;
  },

  compareNames(a, b) {
    const aAsync = a.startsWith('async');
    const bAsync = b.startsWith('async');
    return aAsync && !bAsync ? 1 : bAsync && !aAsync ? -1 : a > b ? 1 : b > a ? -1 : 0;
  },
};
