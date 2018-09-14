import assert from "static-type-assert";
import * as iter from "../index";

assert<
  Iterable<number[]>
>(iter.product([0, 1, 2], [3, 4, 5]));
