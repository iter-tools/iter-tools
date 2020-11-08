/**
 * @generated-from ./$peekerator.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { ensureIterable } from './iterable';

const _ = Symbol.for('_');

export class Peekerator {
  static from(iterable, ...args) {
    const iterator = ensureIterable(iterable)[Symbol.iterator]();
    const first = iterator.next();
    return new this(iterator, first, ...args);
  }

  constructor(iterator, first) {
    this[_] = {
      iterator,
      current: first,
      index: 0,
    };
  }

  get current() {
    return this[_].current;
  }

  get value() {
    return this[_].current.value;
  }

  get done() {
    return this[_].current.done;
  }

  get index() {
    return this[_].current.index;
  }

  advance() {
    const this_ = this[_];
    this_.index++;
    this_.current = this_.iterator.next();
  }

  return() {
    const this_ = this[_];
    if ('return' in this_.iterator) {
      this_.iterator.return();
    }
    this_.current = { value: undefined, done: true };
  }
}
