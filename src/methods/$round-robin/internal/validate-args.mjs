import { isObject, isDef } from '../../../internal/shapes';
import { isInteger } from '../../../internal/number';

export function validateArgs(args) {
  if (isObject(args[1])) {
    const { start, step } = args[1];
    args[0] = start;
    args[1] = step;
  }

  if (isDef(args[1])) {
    args[1] = Number(args[1]);
    if (!isInteger(args[1], true)) {
      throw new Error('step argument to roundRobin must be a non-zero integer');
    }
  }
}
