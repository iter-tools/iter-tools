import { isInteger, isPositiveInteger, isIntegerOrInfinite } from '../../../internal/number.js';
import { isObject } from '../../is-object/is-object.js';

export const makeValidateArgs = (methodName) =>
  function validateArgs(args) {
    let [, optsOrStart = 0, end = Infinity, step = 1] = args;
    let start = typeof optsOrStart === 'number' ? optsOrStart : undefined;
    if (isObject(optsOrStart)) {
      ({ start = 0, end = Infinity, step = 1 } = optsOrStart);
    }

    if (!isInteger(start)) {
      throw new TypeError(`start argument to ${methodName} must be a number`);
    }

    if (!isIntegerOrInfinite(end)) {
      throw new TypeError(`end argument to ${methodName} must be an integer or infinte`);
    }

    if (!isPositiveInteger(step)) {
      throw new TypeError(`step argument to ${methodName} must be a integer > 0`);
    }

    args[1] = start;
    args[2] = end;
    args[3] = step;
  };
