import { ResultIterable } from '../../types/iterable';

declare function regexpExec(regexp: RegExp): (str: string) => ResultIterable<string>;

declare function regexpExec(regexp: RegExp, str: string): ResultIterable<string>;

export default regexpExec;
