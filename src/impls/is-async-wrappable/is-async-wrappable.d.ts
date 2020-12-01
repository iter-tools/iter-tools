declare function isAsyncWrappable(
  value: any,
): value is Iterable<unknown> | AsyncIterable<unknown> | null | undefined;

export default isAsyncWrappable;
