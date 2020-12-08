import assert from 'static-type-assert';
import { $Iterable, $ResultIterable } from '../../../types/$iterable';
import { $splitGroups } from 'iter-tools-es';

declare const Ø: never;

assert<$ResultIterable<[string, $ResultIterable<string>]>>($splitGroups(Ø as string));

assert<$ResultIterable<[number, $ResultIterable<number>]>>($splitGroups(Ø as $Iterable<number>));
