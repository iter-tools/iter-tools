import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry, $callReturn } from '../../internal/$iterable.js';
import { $IterableIterator } from '../../internal/$iterable-iterator.js';
import { $parallelEach } from '../../internal/$parallel-each.js';
import { $Peekerator } from '../../internal/$peekerator.js';
import { $__map } from '../$map/$map.js';
import { $__toArray } from '../$to-array/$to-array.js';

const _ = Symbol.for('_');
const __advance = Symbol.for('__advance');

class $SummarizedPeekerator extends $Peekerator {
  constructor(iterator, first, inputSummary) {
    super(iterator, first);
    this[_].inputSummary = inputSummary;
  }

  @$async
  advance() {
    $await(this[_].inputSummary.advanceBuffer(this));
  }

  @$async
  [__advance]() {
    $await(super.advance());
  }
}

class $InputSummaryInternal {
  constructor() {
    this.buffers = [];
    this.notDoneBuffer = null;
    this.index = 0;
  }

  init(buffers) {
    this.buffers = buffers;
    this.updateNotDone();
  }

  updateNotDone() {
    this.notDoneBuffer = this.buffers.find((buffer) => !buffer.done);
  }

  @$async
  advanceBuffer(buffer) {
    const wasDone = buffer.done;

    $await(buffer[__advance]());
    this.index++;

    if (!wasDone && buffer.done) {
      this.updateNotDone();
    }
  }
}

export class $InputSummary {
  constructor(internal) {
    this[_] = internal;
  }

  advance() {
    throw new Error('advance() is not supported on an interleave summary');
  }

  get current() {
    return { value: this.value, done: this.done };
  }

  get value() {
    return this[_].notDoneBuffer;
  }

  get done() {
    return this[_].notDoneBuffer === undefined;
  }

  get index() {
    return this[_].index;
  }
}

class $Interleaver extends $IterableIterator {
  constructor(sources, strategy, options) {
    super();
    this.sources = sources;
    this.strategy = strategy;
    this.options = options;

    this.initialized = false;
    this.inputSummary = new $InputSummaryInternal(sources);
  }

  @$async
  init() {
    this.initialized = true;
    const { strategy, options, inputSummary } = this;
    this.buffers = $await(
      $__toArray(
        $__map(this.sources, (source) => $SummarizedPeekerator.from(source, inputSummary)),
      ),
    );
    this.iterator = strategy(options, new $InputSummary(inputSummary), ...this.buffers);

    $await(inputSummary.init(this.buffers));
  }

  @$async
  returnBuffers() {
    $await($parallelEach(this.buffers, (buffer) => buffer.return()));
  }

  @$async
  next() {
    if (!this.initialized) $await(this.init());

    const step = $await(this.iterator.next());
    if (step.done) $await(this.returnBuffers());
    return step;
  }

  @$async
  return() {
    $await($callReturn(this.iterator));
    $await(this.returnBuffers());
  }
}

export function $__interleave(sources, strategy, options = {}) {
  return new $Interleaver(sources, strategy, options);
}

export const $interleave = /*#__PURE__*/ $iterableCurry($__interleave, {
  variadic: true,
  growRight: true,
  minArgs: 1,
  maxArgs: 2,
});
