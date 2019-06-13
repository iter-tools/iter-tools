declare function regexpExec(re: RegExp): (str: string) => IterableIterator<string>;

declare function regexpExec(re: RegExp, str: string): IterableIterator<string>;

export default regexpExec;
