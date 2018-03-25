const benchmarks = require('require-all')(__dirname)

for (const dep in benchmarks) {
  for (const b in benchmarks[dep]) {
    benchmarks[dep][b]()
  }
}
