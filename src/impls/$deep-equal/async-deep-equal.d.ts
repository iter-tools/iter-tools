/**
 * @generated-from ./$deep-equal.d.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

declare function asyncDeepEqual(...values: Array<any>): Promise<boolean>;

declare function __asyncDeepEqual(
  iterables: Array<any>,
  same?: (a: any, b: any) => boolean,
  coerceNil?: boolean,
): Promise<boolean>;

export { __asyncDeepEqual, asyncDeepEqual };
