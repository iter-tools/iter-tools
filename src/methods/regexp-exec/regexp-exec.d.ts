import { GeneratorIterator } from '../../internal/iterable';

declare function regexpExec(re: RegExp): (str: string) => GeneratorIterator<string>;

declare function regexpExec(re: RegExp, str: string): GeneratorIterator<string>;

export default regexpExec;
