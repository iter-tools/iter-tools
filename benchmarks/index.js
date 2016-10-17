var benchmarks = require('require-all')(__dirname);

for (var dep in benchmarks) {
  for (var b in benchmarks[dep]) {
    console.log('************ ', b, ' ************');
    benchmarks[dep][b]();
  }
}
