import { isObject } from '../../../internal/shapes';

export function validateArgs(args) {
  const depthOrOptions = args[1];
  let shouldFlat = args[0];
  let depth = depthOrOptions;
  if (isObject(depthOrOptions)) {
    ({ shouldFlat, depth } = depthOrOptions);
  }
  args[0] = shouldFlat;
  args[1] = depth;
}
