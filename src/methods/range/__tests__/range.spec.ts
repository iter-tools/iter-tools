import assert from 'static-type-assert';
import { GeneratorIterator } from '../../../internal/iterable';
import { range } from '../../..';

declare const Ø: never;

assert<GeneratorIterator<number>>(range(Ø as number));

assert<GeneratorIterator<number>>(range(Ø as { start: 2 }));

assert<GeneratorIterator<number>>(range());
