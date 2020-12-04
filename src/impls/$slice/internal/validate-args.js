import { isObject } from '../../../internal/shapes.js';

export const makeValidateArgs = (methodName) =>
  function validateArgs(args) {
    let [, optsOrStart = 0, end = Infinity, step = 1] = args;
    let start = typeof optsOrStart === 'number' ? optsOrStart : undefined;
    if (isObject(optsOrStart)) {
      ({ start = 0, end = Infinity, step = 1 } = optsOrStart);
    }

    if (typeof start !== 'number') {
      throw new TypeError(`start argument to ${methodName} must be a number`);
    }

    if (typeof end !== 'number') {
      throw new TypeError(`end argument to ${methodName} must be a number`);
    }

    if (typeof step !== 'number' || step <= 0) {
      throw new TypeError(`step argument to ${methodName} must be a number > 0`);
    }

    args[1] = start;
    args[2] = end;
    args[3] = step;
  };
