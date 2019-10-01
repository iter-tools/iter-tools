import assert from 'static-type-assert';
import { GeneratorIterator } from '../../../internal/iterable';
import { keys } from '../../..';

declare const Ø: never;

assert<GeneratorIterator<string>>(keys(Ø as { foo: string; bar: null }));

assert<GeneratorIterator<string>>(keys(Ø as {}));

assert<GeneratorIterator<string>>(keys(Ø as { 0: string; 1: null }));
