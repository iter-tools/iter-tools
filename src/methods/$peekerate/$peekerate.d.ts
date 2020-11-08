import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable } from '../../types/$iterable';

interface $PeekeratorBase {
  advance(): $Promise<void>;
  return(): $Promise<void>;
  readonly index: number;
}

interface $DonePeekerator extends $PeekeratorBase {
  readonly current: { done: true; value: undefined };
  readonly done: true;
  readonly value: undefined;
}

interface $ValuePeekerator<T> extends $PeekeratorBase {
  readonly current: { done: false; value: T };
  readonly done: false;
  readonly value: T;
}

export type $Peekerator<T> = $DonePeekerator | $ValuePeekerator<T>;

export declare class $PeekeratorClass<T> implements $PeekeratorBase {
  constructor(iterator: $Iterator<T>, first: T);
  static from<T>(source: Iterable<T>): $Promise<$Peekerator<T>>;
  readonly current: { done: true; value: undefined } | { done: false; value: T };
  readonly done: boolean;
  readonly value: T | undefined;
  readonly index: number;
  advance(): $Promise<void>;
  return(): $Promise<void>;
}

declare function $peekerate<T>(source: $SourceIterable<T>): $Peekerator<T>;

export default $peekerate;
