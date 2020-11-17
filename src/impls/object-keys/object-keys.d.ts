import { ResultIterable } from '../../types/iterable';

declare function objectKeys(obj: { [id: string]: any } | null | undefined): ResultIterable<string>;

export default objectKeys;
