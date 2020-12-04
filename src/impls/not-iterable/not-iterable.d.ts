declare function notIterable<T>(value: T | Iterable<any>): value is T;

export { notIterable };
