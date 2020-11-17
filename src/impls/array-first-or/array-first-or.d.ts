declare function arrayFirstOr<T>(whenEmpty: any, tuple: [T, ...Array<any>]): T;

declare function arrayFirstOr<E, T>(whenEmpty: E, array: Array<T> | null | void): T | E;

export default arrayFirstOr;
