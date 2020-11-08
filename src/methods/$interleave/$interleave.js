import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $Peekerator } from '../../internal/$peekerator';
import { $map } from '../$map/$map';
import { $toArray } from '../$to-array/$to-array';

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
  }

  init(buffers) {
    this.buffers = buffers;
    this.updateNotDone();
  }

  updateNotDone() {
    this.notDoneBuffer = this.buffers.find(buffer => !buffer.done);
  }

  @$async
  advanceBuffer(buffer) {
    const wasDone = buffer.done;

    $await(buffer[__advance]());

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
    return { done: this.done, value: this.value };
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

class $Interleaver {
  constructor(sources, strategy, options) {
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
      $toArray($map(this.sources, source => $SummarizedPeekerator.from(source, inputSummary))),
    );
    this.iterator = strategy(options, new $InputSummary(inputSummary), ...this.buffers);

    $await(inputSummary.init(this.buffers));
  }

  @$async
  next() {
    if (!this.initialized) $await(this.init());

    return $await(this.iterator.next());
  }

  @$async
  return() {
    for (const buffer of this.buffers) $await(buffer.return());
  }
}

export function $interleave(sources, strategy, options = {}) {
  return new $Interleaver(sources, strategy, options);
}

export default $iterableCurry($interleave, {
  variadic: true,
  optionalArgsAtEnd: true,
  minArgs: 1,
  maxArgs: 2,
});
