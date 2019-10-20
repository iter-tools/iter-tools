import { Iterable, ResultIterable } from '../../types/iterable';

declare function keys(obj: { [id: string]: any } | null | undefined): ResultIterable<string>;

export default keys;
