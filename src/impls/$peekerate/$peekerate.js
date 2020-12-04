import { $ensureIterable } from '../../internal/$iterable.js';
import { $Peekerator } from '../../internal/$peekerator.js';

export function $__peekerate(source) {
  return $Peekerator.from(source);
}

function $wrapWithEnsureIterable(fn) {
  return (source) => fn($ensureIterable(source));
}

export const $peekerate = $wrapWithEnsureIterable($__peekerate);
