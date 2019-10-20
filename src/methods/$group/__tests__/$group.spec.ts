import assert from 'static-type-assert';
import { $Iterable, $ResultIterable } from '../../../types/$iterable';
import { $group } from '../../..';

declare const Ø: never;

assert<$ResultIterable<[string, $ResultIterable<string>]>>($group(Ø as string));

assert<$ResultIterable<[number, $ResultIterable<number>]>>($group(Ø as $Iterable<number>));
