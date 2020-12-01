declare function notWrappable<T>(value: T | Iterable<any> | null | undefined): value is T;

export default notWrappable;
