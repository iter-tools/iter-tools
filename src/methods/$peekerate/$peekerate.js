import { $Peekerator } from '../../internal/$peekerator';

// This is for the benefit of the type system.
// In TS an identifier cannot represent a type *and* a value, and I need both.
export { $Peekerator, $Peekerator as $PeekeratorClass };

export function $peekerate(source) {
  return $Peekerator.from(source);
}

export default $peekerate;
