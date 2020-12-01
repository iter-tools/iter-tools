declare function isWrappable(value: any): value is Iterable<unknown> | null | undefined;

export default isWrappable;
