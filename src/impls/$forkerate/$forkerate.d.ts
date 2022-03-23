import { $iteratorSymbol, $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable, $IteratorResult, $NonIterableIterator } from '../../types/$iterable';

export interface $ForkeratorIterator<T> {
  next(): $IteratorResult<T>;
  return(): $IteratorResult<T>;
  [$iteratorSymbol](): $NonIterableIterator<T>;
}

interface $ForkeratorBase<T> {
  readonly index: number;

  /* eslint-disable no-use-before-define */
  advance(): $Promise<$Forkerator<T>>;
  return(): $Promise<$Forkerator<T>>;
  /* eslint-enaable no-use-before-define */
  fork(): $ForkeratorIterator<T>;
  asIterator(): $ForkeratorIterator<T>;
  [$iteratorSymbol](): $ForkeratorIterator<T>;
}

interface $DoneForkerator<T> extends $ForkeratorBase<T> {
  readonly current: { done: true; value: undefined };
  readonly done: true;
  readonly value: undefined;
}

interface $ValueForkerator<T> extends $ForkeratorBase<T> {
  readonly current: { done: false; value: T };
  readonly done: false;
  readonly value: T;
}

export type $Forkerator<T> = $DoneForkerator<T> | $ValueForkerator<T>;

declare function $forkerate<T>(source: $Wrappable<T>): $Promise<$Forkerator<T>>;

export { $forkerate };
