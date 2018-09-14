import assert from "static-type-assert";
import * as iter from "../index";
import compare = assert.compare;

const a = iter.combinations([0, 1, 2, 3], 3);
compare<typeof a, Iterable<[number, number, number]>>("equal");

const a0 = iter.combinations([0, 1, 2, 3], Number());
compare<typeof a0, Iterable<number[]>>("equal");

const a1 = iter.combinations([0, 1, 2, 3], 999);
compare<typeof a1, Iterable<number[]>>("equal");

const b = iter.permutations([0, 1, 2, 3], 3);
compare<typeof b, Iterable<[number, number, number]>>("equal");

const b0 = iter.permutations([0, 1, 2, 3], Number());
compare<typeof b0, Iterable<number[]>>("equal");

const b1 = iter.permutations([0, 1, 2, 3], 999);
compare<typeof b1, Iterable<number[]>>("equal");

const c = iter.product([0, 1, 2], [3, 4, 5]);
compare<typeof c, Iterable<number[]>>("equal");
