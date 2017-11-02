var benchmarks = require('require-all')(__dirname);

for (var dep in benchmarks) {
  for (var b in benchmarks[dep]) {
    benchmarks[dep][b]();
  }
}
