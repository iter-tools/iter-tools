import { $Promise } from '../../../generate/async.macro.cjs';

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

declare function $peekerate<T>(source: $SourceIterable<T>): $Peekerator<T>;

export default $peekerate;
