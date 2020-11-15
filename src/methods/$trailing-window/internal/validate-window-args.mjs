import { isObject, isDef } from '../../../internal/shapes';

export const validateWindowArgs = methodName =>
  function validateArgs(args) {
    if (isObject(args[0])) {
      const { filler, size } = args[0];

      if (isDef(size) && isDef(args[1])) {
        throw new Error(
          `size cannot be specified as both a positional and named argument to ${methodName}`,
        );
      }

      args[0] = size;
      args[1] = { filler };
    }
    if (typeof args[0] !== 'number') {
      throw new Error(`${methodName} must be passed a numeric size`);
    }
  };
