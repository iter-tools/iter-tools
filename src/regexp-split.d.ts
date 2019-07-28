import { GeneratorIterator } from './internal/iterable';

declare function regexpSplit(re: RegExp | string): (str: string) => GeneratorIterator<string>;

declare function regexpSplit(re: RegExp | string, str: string): GeneratorIterator<string>;

export default regexpSplit;
