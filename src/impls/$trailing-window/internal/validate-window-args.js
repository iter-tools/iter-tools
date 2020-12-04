import { isObject, isDef } from '../../../internal/shapes.js';

export const validateWindowArgs = (methodName) =>
  function validateArgs(args) {
    if (isObject(args[1])) {
      const { filler, size } = args[1];

      if (isDef(size) && isDef(args[2])) {
        throw new Error(
          `size cannot be specified as both a positional and named argument to ${methodName}`,
        );
      }

      args[1] = size;
      args[2] = { filler };
    }
    if (typeof args[1] !== 'number') {
      throw new Error(`${methodName} must be passed a numeric size`);
    }
  };
