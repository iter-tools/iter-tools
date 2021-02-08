import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro.cjs';

import { $ensureIterable } from '../../internal/$iterable.js';
import { $Exchange } from '../../internal/$fork.js';
import { $Peekerator } from '../../internal/$peekerator.js';

const _ = Symbol.for('_');

class $Forkerator extends $Peekerator {
  @$async
  static from(source) {
    const exchange = new $Exchange($ensureIterable(source)[$iteratorSymbol]());
    return $await(super.from(exchange.fork(), exchange));
  }

  constructor(iterator, first, exchange) {
    super(iterator, first);

    this[_].exchange = exchange;
  }

  @$async
  advance(n = 1) {
    for (let i = 0; i < n; i++) {
      $await(super.advance());
      this[_].exchange.advance();
    }
    return this;
  }

  fork() {
    return this[_].exchange.fork();
  }
}

export function $__forkerate(source) {
  return $Forkerator.from(source);
}

function $wrapWithEnsureIterable(fn) {
  return (source) => fn($ensureIterable(source));
}

export const $forkerate = $wrapWithEnsureIterable($__forkerate);
