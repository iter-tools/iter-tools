import assert from 'static-type-assert';
import { ResultIterable } from '../../../internal/iterable';
import { keys } from '../../..';

declare const Ø: never;

assert<ResultIterable<string>>(keys(Ø as { foo: string; bar: null }));

assert<ResultIterable<string>>(keys(Ø as {}));

assert<ResultIterable<string>>(keys(Ø as { 0: string; 1: null }));
