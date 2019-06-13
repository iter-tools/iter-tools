declare function values<T = any>(obj: { [id: string]: T } | null | undefined): IterableIterator<T>;

export default values;
