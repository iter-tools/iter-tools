import assert from 'static-type-assert';
import { ResultIterable } from '../../../types/iterable';
import { objectKeys } from '../../..';

declare const Ø: never;

assert<ResultIterable<string>>(objectKeys(Ø as { foo: string; bar: null }));

assert<ResultIterable<string>>(objectKeys(Ø as {}));

assert<ResultIterable<string>>(objectKeys(Ø as { 0: string; 1: null }));
