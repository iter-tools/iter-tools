declare function notAsyncWrappable<T>(
  value: T | AsyncIterable<any> | Iterable<any> | null | undefined,
): value is T;

export default notAsyncWrappable;
