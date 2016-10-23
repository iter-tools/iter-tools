function regexpExec(re, str) {
  function* iter(str) {
    var match;
    while (null !== (match = re.exec(str))) {
      yield match;
      if (!re.global) return;
    }
  }
  if (typeof str === 'undefined') {
    return iter;
  }
  return iter(str);
}

module.exports = regexpExec;
