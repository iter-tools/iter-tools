const flagMap = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  dotAll: 's',
  sticky: 'y',
  unicode: 'u',
};

export function cloneRegexp(regex, options = {}) {
  const flags = Object.keys(flagMap)
    .map(flag => {
      const flagValue = typeof options[flag] === 'boolean' ? options[flag] : regex[flag];
      return flagValue ? flagMap[flag] : '';
    })
    .join('');

  const clonedRegexp = new RegExp(regex.source, flags);
  return clonedRegexp;
}

export function isRegExp(input) {
  return Object.prototype.toString.call(input) === '[object RegExp]';
}
