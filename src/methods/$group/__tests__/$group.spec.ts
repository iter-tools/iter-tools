import assert from 'static-type-assert';
import { $Iterable, $ResultSubseqIterable } from '../../../types/$iterable';
import { $EntryIterable } from '../../../types/$entry-iterable';
import { $group } from '../../..';

declare const Ø: never;

assert<$EntryIterable<string, $ResultSubseqIterable<string>>>($group(Ø as string));

assert<$EntryIterable<number, $ResultSubseqIterable<number>>>($group(Ø as $Iterable<number>));
