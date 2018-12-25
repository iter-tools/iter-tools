const regexpExec = require('../es2018/regexp-exec')

function generateCurrentAccount (nlines) {
  const lines = []
  lines.push('transaction id;businness code;money in;money out')
  for (var i = 0; i < nlines; i++) {
    lines.push(`${i};AAA123;${(Math.random() * 1000).toFixed(2)};${(Math.random() * 1000).toFixed(2)}`)
  }
  return lines.join('\n')
}

const csv = generateCurrentAccount(1000)

module.exports['RegExp vanilla'] = function () {
  const re = /^[0-9]+;[A-Z]{3}[0-9]*;([0-9.]*);([0-9.]*)/gm
  const transactions = []
  let match
  while ((match = re.exec(csv)) !== null) {
    transactions.push(match)
  }
}

module.exports['RegExp iter-tools'] = function () {
  const regIter = regexpExec(/^[0-9]+;[A-Z]{3}[0-9]*;([0-9.]*);([0-9.]*)/gm)
  const transactions = []
  for (let [match] of regIter(csv)) {
    transactions.push(match)
  }
}
