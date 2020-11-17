import assert from 'static-type-assert';
import { arrayFirstOr } from '@iter-tools/es';

declare const Ø: never;

assert<0>(arrayFirstOr(Ø as null, Ø as [0, 1, 2, 3]));

assert<number>(arrayFirstOr(Ø as null, Ø as [number, ...any[]]));
