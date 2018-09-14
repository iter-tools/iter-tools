import assert from "static-type-assert";
import * as iter from "../index";

assert<
  Iterable<[number, number, number, number]>
>(iter.range(4));

assert<
  Iterable<number[]>
>(iter.range(200));

assert<
  Iterable<number>
>(iter.range({start: 2}));
