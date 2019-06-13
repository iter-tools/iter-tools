export default function range(opts) {
  return {
    *[Symbol.iterator]() {
      let start, step, end;
      opts =
        typeof opts === 'number' ? { end: opts, start: 0 } : typeof opts === 'object' ? opts : {};
      step = opts.step === undefined ? 1 : opts.step;
      end = opts.end === undefined ? (step > 0 ? Infinity : -Infinity) : opts.end;
      start = opts.start ? opts.start : 0;

      for (let i = start; step > 0 ? i < end : i > end; i += step) {
        yield i;
      }
    },
  };
}
