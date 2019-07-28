import assert from 'static-type-assert';
import { GeneratorIterator } from '../internal/iterable';
import { values } from '..';

declare var Ø: never;

assert<GeneratorIterator<number>>(values(Ø as { foo: number }));

assert<GeneratorIterator<string | null>>(values(Ø as { foo: string, bar: null }));

assert<GeneratorIterator<never>>(values(Ø as {}));
