declare function notObject<T>(value: T | Record<string, any>): value is T;

export { notObject };
