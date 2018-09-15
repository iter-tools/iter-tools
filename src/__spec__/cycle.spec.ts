import assert from "static-type-assert";
import * as iter from "../index";

assert<
  Iterable<0 | 1 | 2>
>(iter.cycle([0, 1, 2] as [0, 1, 2]));

assert<
  Iterable<never> |
  Iterable<0 | 1> |
  Iterable<string | number | boolean>
>(iter.cycle([] as [] | [0, 1] | [string, number, boolean]));

assert<
  Iterable<string | number | boolean>
>(iter.cycle([] as [] | [0, 1] | [string, number, boolean]));

assert<
  Iterable<string>
>(iter.cycle(iter.iterable("")));
