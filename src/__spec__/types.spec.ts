import assert from "static-type-assert";
import * as tuple from "typescript-tuple";
import * as iter from "../index";
import compare = assert.compare;

const a = iter.combinations([0, 1, 2, 3], 3);
compare<typeof a, Iterable<[number, number, number]>>("equal");

const b = iter.permutations([0, 1, 2, 3], 3);
compare<typeof b, Iterable<[number, number, number]>>("equal");

const c = iter.product([0, 1, 2], [3, 4, 5]);
compare<typeof c, Iterable<number[]>>("equal");
