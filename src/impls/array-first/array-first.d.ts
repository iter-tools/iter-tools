declare function arrayFirst<T>(tuple: [T, ...Array<any>]): T;

declare function arrayFirst<T>(array: Array<T> | null | void): T | undefined;

export { arrayFirst };
