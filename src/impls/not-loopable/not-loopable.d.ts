declare function notLoopable<T>(value: T | Iterable<any>): value is T;

export { notLoopable };
