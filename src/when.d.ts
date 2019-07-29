declare function when(condition: any, value: null | undefined): {} & Array<never>;

declare function when<T extends Iterable<any>>(condition: any, value: T): T | [];

declare function when<T extends Object>(condition: any, value: T): T | {};

export default when;
