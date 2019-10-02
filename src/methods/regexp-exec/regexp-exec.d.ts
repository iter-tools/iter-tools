import { ResultIterable } from '../../types/iterable';

declare function regexpExec(re: RegExp): (str: string) => ResultIterable<string>;

declare function regexpExec(re: RegExp, str: string): ResultIterable<string>;

export default regexpExec;
