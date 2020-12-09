import { isObject } from '../../is-object/is-object.js';

export function validateArgs(args) {
  const depthOrOptions = args[1];
  let shouldFlat = args[2];
  let depth = depthOrOptions;
  if (isObject(depthOrOptions)) {
    ({ shouldFlat, depth } = depthOrOptions);
  }
  args[2] = shouldFlat;
  args[1] = depth;
}
