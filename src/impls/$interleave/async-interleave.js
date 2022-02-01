/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$interleave.js#1643837503074
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry, asyncCallReturn } from '../../internal/async-iterable.js';
import { AsyncIterableIterator } from '../../internal/async-iterable-iterator.js';
import { asyncParallelEach } from '../../internal/async-parallel-each.js';
import { AsyncPeekerator } from '../../internal/async-peekerator.js';
import { __asyncMap } from '../$map/async-map.js';
import { __asyncToArray } from '../$to-array/async-to-array.js';

const _ = Symbol.for('_');
const __advance = Symbol.for('__advance');

class AsyncSummarizedPeekerator extends AsyncPeekerator {
  constructor(iterator, first, inputSummary) {
    super(iterator, first);
    this[_].inputSummary = inputSummary;
  }

  async advance() {
    await this[_].inputSummary.advanceBuffer(this);
  }

  async [__advance]() {
    await super.advance();
  }
}

class AsyncInputSummaryInternal {
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

  async advanceBuffer(buffer) {
    const wasDone = buffer.done;

    await buffer[__advance]();
    this.index++;

    if (!wasDone && buffer.done) {
      this.updateNotDone();
    }
  }
}

export class AsyncInputSummary {
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

class AsyncInterleaver extends AsyncIterableIterator {
  constructor(sources, strategy, options) {
    super();
    this.sources = sources;
    this.strategy = strategy;
    this.options = options;

    this.initialized = false;
    this.inputSummary = new AsyncInputSummaryInternal(sources);
  }

  async init() {
    this.initialized = true;
    const { strategy, options, inputSummary } = this;
    this.buffers = await __asyncToArray(
      __asyncMap(this.sources, (source) => AsyncSummarizedPeekerator.from(source, inputSummary)),
    );
    this.iterator = strategy(options, new AsyncInputSummary(inputSummary), ...this.buffers);

    await inputSummary.init(this.buffers);
  }

  async returnBuffers() {
    await asyncParallelEach(this.buffers, (buffer) => buffer.return());
  }

  async next() {
    if (!this.initialized) await this.init();

    const step = await this.iterator.next();
    if (step.done) await this.returnBuffers();
    return step;
  }

  async return() {
    await asyncCallReturn(this.iterator);
    await this.returnBuffers();
    return { value: undefined, done: true };
  }
}

export function __asyncInterleave(sources, strategy, options = {}) {
  return new AsyncInterleaver(sources, strategy, options);
}

export const asyncInterleave = /*#__PURE__*/ asyncIterableCurry(__asyncInterleave, {
  variadic: true,
  growRight: true,
  minArgs: 1,
  maxArgs: 2,
});
