export const validateWindowArgs = methodName =>
  function validateArgs(args) {
    if (args[0] && typeof args[0] === 'object') {
      const { filler, size } = args[0];

      if (size !== undefined && args[1] !== undefined) {
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
