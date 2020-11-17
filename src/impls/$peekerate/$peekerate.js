import { $ensureIterable } from '../../internal/$iterable.js';
import { $Peekerator } from '../../internal/$peekerator.js';

// This is for the benefit of the type system.
// In TS an identifier cannot represent a type *and* a value, and I need both.
export { $Peekerator };

export function $peekerate(source) {
  return $Peekerator.from(source);
}

function $wrapWithEnsureIterable(fn) {
  return (source) => fn($ensureIterable(source));
}

export default $wrapWithEnsureIterable($peekerate);
