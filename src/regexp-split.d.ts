declare function regexpSplit(re: RegExp | string): (str: string) => IterableIterator<string>;

declare function regexpSplit(re: RegExp | string, str: string): IterableIterator<string>;

export default regexpSplit;
