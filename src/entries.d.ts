declare function entries<T = any>(
  obj: { [id: string]: T } | null | undefined,
): IterableIterator<[string, T]>;

export default entries;
