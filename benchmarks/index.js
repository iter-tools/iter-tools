const Benchmark = require('benchmark');

run([
  bench('filter 1000 items', require('./filter-1000')),
  bench('filter 100000 items', require('./filter-100000')),
  bench('map 1000 items', require('./map-1000')),
  bench('map 100000 items', require('./map-100000')),
  bench('compose 1000 items', require('./compose-1000')),
  bench('compose 100000 items', require('./compose-100000')),
  bench('regexp', require('./regexp-10000')),
  bench('while - for', require('./while-for-10000')),
  bench('async-map 1000 items', require('./async-map-1000')),
  bench('async-map parallel', require('./async-map-parallel')),
  bench('fork vs multipartition', require('./fork-vs-multi-partition')),
]);

function bench(title, config) {
  return function(next) {
    const suite = new Benchmark.Suite();

    for (const key of Object.keys(config)) {
      suite.add(key, config[key]);
    }

    suite.on('start', function() {
      console.log('  ' + title);
    });

    suite.on('cycle', function(event) {
      console.log('    \x1B[0;32m✓\x1B[0m \x1B[0;37m ' + event.target + '\x1B[0m');
    });

    suite.on('complete', function() {
      // const slowest = this.filter('slowest')[0]
      const baselineSuite = this.shift();
      const iterToolsSuite = this.shift();

      const diff = iterToolsSuite.hz - baselineSuite.hz;
      let percentage = ((diff / baselineSuite.hz) * 100).toFixed(2);
      let relation = 'faster';

      if (percentage < 0) {
        relation = 'slower';
        percentage *= -1;
      }

      console.log(
        '\n    \x1B[0;37mResult:\x1B[0m ' +
          iterToolsSuite.name +
          ' \x1B[0;37mis\x1B[0m ' +
          percentage +
          '% ' +
          relation +
          ' \x1B[0;37mthan\x1B[0m ' +
          baselineSuite.name +
          '.\n',
      );
      next();
    });
    suite.run({
      async: true,
    });
  };
}

function run(benchmarks) {
  let index = -1;
  const length = benchmarks.length;
  const startTime = Date.now();

  console.log('  \x1B[0;37mRunning ' + length + ' benchmarks, please wait...\x1B[0m\n');
  function continuation() {
    index++;
    if (index < length) {
      benchmarks[index](continuation);
    } else {
      const endTime = Date.now();
      const total = Math.ceil((endTime - startTime) / 1000);
      console.log('  \n\x1B[0;37mFinished in ' + total + ' seconds\x1B[0m\n');
    }
  }
  continuation();
}
