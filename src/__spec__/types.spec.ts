import assert from "static-type-assert";
import * as tuple from "typescript-tuple";
import * as iter from "../index";
import compare = assert.compare;

assert<
  Iterable<[number, number, number]>
>(iter.combinations([0, 1, 2, 3], 3));

assert<
  Iterable<[number, number, number]>
>(iter.permutations([0, 1, 2, 3], 3));

assert<
  Iterable<number[]>
>(iter.product([0, 1, 2], [3, 4, 5]));
