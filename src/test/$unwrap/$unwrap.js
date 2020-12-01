import { $async, $await } from '../../../generate/async.macro.cjs';

import { $isLoopable } from '../../internal/$iterable.js';

$async;
export function $unwrap(iterable) {
  const values = [];

  $await;
  for (const value of iterable) {
    values.push(value);
  }

  return values;
}

$async;
export function $unwrapDeep(iterable) {
  const values = [];

  $await;
  for (const value of iterable) {
    if (typeof value !== 'string' && $isLoopable(value)) {
      values.push($await($unwrapDeep(value)));
    } else {
      values.push(value);
    }
  }

  return values;
}
