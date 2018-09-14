import assert from "static-type-assert";
import * as iter from "../index";

assert<
  Iterable<[number, number, number]>
>(iter.combinations([0, 1, 2, 3], 3));

assert<
  Iterable<number[]>
>(iter.combinations([0, 1, 2, 3], Number()));

assert<
  Iterable<number[]>
>(iter.combinations([0, 1, 2, 3], 999));

assert<
  Iterable<[number, number, number]>
>(iter.permutations([0, 1, 2, 3], 3));

assert<
  Iterable<number[]>
>(iter.permutations([0, 1, 2, 3], Number()));

assert<
  Iterable<number[]>
>(iter.permutations([0, 1, 2, 3], 999));

assert<
  Iterable<number[]>
>(iter.product([0, 1, 2], [3, 4, 5]));
