import { $iteratorSymbol, $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable, $IteratorResult, $NonIterableIterator } from '../../types/$iterable';

export interface $PeekeratorIterator<T> {
  next(): $IteratorResult<T>;
  return(): $IteratorResult<T>;
  [$iteratorSymbol](): $NonIterableIterator<T>;
}

interface $PeekeratorBase<T> {
  readonly index: number;

  /* eslint-disable no-use-before-define */
  advance(): $Promise<$Peekerator<T>>;
  return(): $Promise<$Peekerator<T>>;
  /* eslint-enaable no-use-before-define */
  asIterator(): $PeekeratorIterator<T>;
}

interface $DonePeekerator<T> extends $PeekeratorBase<T> {
  readonly current: { done: true; value: undefined };
  readonly done: true;
  readonly value: undefined;
}

interface $ValuePeekerator<T> extends $PeekeratorBase<T> {
  readonly current: { done: false; value: T };
  readonly done: false;
  readonly value: T;
}

export type $Peekerator<T> = $DonePeekerator<T> | $ValuePeekerator<T>;

declare function $peekerate<T>(source: $Wrappable<T>): $Promise<$Peekerator<T>>;

export { $peekerate };
