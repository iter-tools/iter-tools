const flagMap = {
  global: 'g',
  ignoreCase: 'i',
  multiline: 'm',
  dotAll: 's',
  sticky: 'y',
  unicode: 'u'
}

export default function cloneRegexp (regex, options = {}) {
  const flags = Object.keys(flagMap).map(flag => {
    const flagValue = typeof options[flag] === 'boolean' ? options[flag] : regex[flag]
    return flagValue ? flagMap[flag] : ''
  }).join('')

  const clonedRegexp = new RegExp(regex.source, flags)
  return clonedRegexp
}
