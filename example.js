/* eslint one-var: off */

'use strict';

class _AwaitValue {
  constructor(value) {
    this.wrapped = value;
  }
}

function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator(fn.apply(this, arguments));
  };
}

class _AsyncGenerator {
  constructor(gen) {
    this._gen = gen;
    this._front = undefined;
    this._back = undefined;

    if (typeof gen.return !== 'function') {
      this.return = undefined;
    }
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  _send(method, arg) {
    const step = this._gen[method](arg);
    const wrappedAwait = step.value instanceof _AwaitValue;
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
      const wrappedAwait = value instanceof _AwaitValue;
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

function _asyncIterator(iterable) {
  let method;

  if ((method = iterable[Symbol.asyncIterator]) != null) {
    return method.call(iterable);
  }
  if ((method = iterable[Symbol.iterator]) != null) {
    return new SyncAsAsyncIterator(method.call(iterable));
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

class SyncAsAsyncIterator {
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

export function asyncMap(...args) {
  return _asyncMap(...args);
}

function _asyncMap() {
  _asyncMap = _wrapAsyncGenerator(function* (source, fn) {
    let _iterAbruptCompletion = false;
    let _didIterError = false;
    let _iter;
    let _iterError;

    try {
      _iter = _asyncIterator(source);
      for (
        let _step, __step;
        (_iterAbruptCompletion = !((__step = _iter.next()),
        (_step = __step instanceof Promise ? yield new _AwaitValue(__step) : __step)).done);
        _iterAbruptCompletion = false
      ) {
        const value = _step.value;
        yield fn(value);
      }
    } catch (err) {
      _didIterError = true;
      _iterError = err;
    } finally {
      try {
        if (_iterAbruptCompletion && _iter.return != null) {
          yield new _AwaitValue(_iter.return());
        }
      } finally {
        if (_didIterError) {
          throw _iterError;
        }
      }
    }
  });
  return _asyncMap.apply(this, arguments);
}
