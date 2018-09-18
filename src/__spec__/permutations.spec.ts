import assert from "static-type-assert";
import * as iter from "../index";

assert<
  IterableIterator<[number, number, number]>
>(iter.permutations([0, 1, 2, 3], 3));

assert<
  IterableIterator<number[]>
>(iter.permutations([0, 1, 2, 3], Number()));

assert<
  IterableIterator<number[]>
>(iter.permutations([0, 1, 2, 3], 999));

assert<
  IterableIterator<[string, string, string]>
>(iter.permutations(iter.iterable(""), 3));

assert<
  IterableIterator<[number, number, number, number]>
>(iter.permutations([0, 1, 2, 3] as [number, number, number, number]));

assert<
  IterableIterator<string[]>
>(iter.permutations(iter.iterable("")));
