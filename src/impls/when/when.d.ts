declare function when(
  condition: any,
  value: null | undefined,
): Record<string, never> & Array<never>;

declare function when<T extends Iterable<any>>(condition: any, value: T): T | [];

declare function when<T extends Record<string, any>>(
  condition: any,
  value: T,
): T | Record<string, never>;

export default when;
