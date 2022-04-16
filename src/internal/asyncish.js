/* eslint one-var: off */

'use strict';

class AwaitValue {
  constructor(value) {
    this.wrapped = value;
  }
}

export function _asyncGeneratorDelegate(inner, awaitWrap) {
  const iter = {};
  let waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return { value: awaitWrap(value), done: false };
  }

  iter[(typeof Symbol !== 'undefined' && Symbol.iterator) || '@@iterator'] = function () {
    return this;
  };

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }
    return pump('next', value);
  };

  if (typeof inner.throw === 'function') {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }
      return pump('throw', value);
    };
  }

  if (typeof inner.return === 'function') {
    iter.return = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump('return', value);
    };
  }

  return iter;
}

export function _awaitAsyncGenerator(value) {
  return new AwaitValue(value);
}

export function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator(fn.apply(this, arguments));
  };
}

export class _AsyncGenerator {
  constructor(gen) {
    this._gen = gen;
    this._front = undefined;
    this._back = undefined;

    if (typeof gen.return !== 'function') {
      this.return = undefined;
    }
  }

  // This behavior still falls within the async iteration protocol
  [Symbol.asyncIterator]() {
    return this;
  }

  _send(method, arg) {
    const step = this._gen[method](arg);
    const wrappedAwait = step.value instanceof AwaitValue;
    return wrappedAwait
      ? new Promise((resolve, reject) => {
          const request = { method, arg, resolve, reject, next: null };
          if (this._back) {
            this._back = this._back.next = request;
          } else {
            this._front = this._back = request;
            this._resume(method, step);
          }
        })
      : step;
  }

  _resume(method, step) {
    try {
      const { value } = step;
      const wrappedAwait = value instanceof AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(
        (arg) => {
          if (wrappedAwait) {
            // the sync generator hit an `await`
            const _method = method === 'return' ? 'return' : 'next';
            this._resume(_method, this._gen[_method](arg));
          } else {
            // the sync generator hit a `yield`
            this._settle(step.done ? 'return' : 'normal', arg);
          }
        },
        (err) => {
          this._resume('throw', err);
        },
      );
    } catch (err) {
      this._settle('throw', err);
    }
  }

  _settle(type, value) {
    let front = this._front;
    switch (type) {
      case 'return':
        front.resolve({ value, done: true });
        break;
      case 'throw':
        front.reject(value);
        break;
      default:
        front.resolve({ value, done: false });
        break;
    }
    this._front = front = front.next;
    if (front) {
      this._resume(front.method, front.arg);
    } else {
      this._back = null;
    }
  }

  next(arg) {
    return this._send('next', arg);
  }

  throw(arg) {
    return this._send('throw', arg);
  }

  return(arg) {
    return this._send('return', arg);
  }
}

export function _asyncIterator(iterable) {
  let method;

  if ((method = iterable[Symbol.asyncIterator]) != null) {
    return method.call(iterable);
  }
  if ((method = iterable[Symbol.iterator]) != null) {
    return new _SyncAsAsyncIterator(method.call(iterable));
  }
  throw new TypeError('Object is not async iterable');
}

function AsyncFromSyncIteratorContinuation(step) {
  if (Object(step) !== step) return Promise.reject(new TypeError(step + ' is not an object.'));
  const done = step.done;
  return Promise.resolve(step.value).then((value) => {
    return { value, done };
  });
}

export class _SyncAsAsyncIterator {
  constructor(iter) {
    this._iter = iter;
  }

  next(...args) {
    const iter = this._iter;
    return AsyncFromSyncIteratorContinuation(iter.next(...args));
  }

  return(value, ...args) {
    const iter = this._iter;
    return undefined === iter.return
      ? Promise.resolve({ value, done: true })
      : AsyncFromSyncIteratorContinuation(iter.return(value, ...args));
  }

  throw(value, ...args) {
    const iter = this._iter;
    return undefined === iter.throw
      ? Promise.reject(value)
      : AsyncFromSyncIteratorContinuation(iter.throw(value, ...args));
  }
}
