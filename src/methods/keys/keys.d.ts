import { Iterable, ResultIterable } from '../../types/iterable';

declare function keys(keysable: { [id: string]: any } | null | undefined): ResultIterable<string>;

declare function keys<K>(keysable: { keys(): Iterable<K> }): ResultIterable<K>;

export default keys;
