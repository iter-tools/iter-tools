import assert from "static-type-assert";
import * as iter from "../index";

assert<
  Iterable<0 | 1 | 2>
>(iter.range(3));

assert<
  Iterable<number>
>(iter.range(200));

assert<
  Iterable<number>
>(iter.range({start: 2}));
