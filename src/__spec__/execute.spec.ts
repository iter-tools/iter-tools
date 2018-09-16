import assert from "static-type-assert";
import * as iter from "../index";

assert<
  Iterable<123>
>(iter.execute(() => 123 as 123));

assert<
  Iterable<123>
>(iter.execute((x) => x, 123 as 123, 456 as 456));

assert<
  Iterable<[]>
>(iter.execute((...args) => args));

assert<
  Iterable<[0, 1, 2]>
>(iter.execute((...args) => args, 0 as 0, 1 as 1, 2 as 2));

assert<
  AsyncIterable<123>
>(iter.asyncExecute(async () => 123 as 123));

assert<
  AsyncIterable<123>
>(iter.asyncExecute(async (x) => x, 123 as 123, 456 as 456));

assert<
  AsyncIterable<[]>
>(iter.asyncExecute(async (...args) => args));

assert<
  AsyncIterable<[0, 1, 2]>
>(iter.asyncExecute(async (...args) => args, 0 as 0, 1 as 1, 2 as 2));
