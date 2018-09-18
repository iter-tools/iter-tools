import assert from "static-type-assert";
import * as iter from "../index";

assert<
  IterableIterator<[string, number]>
>(iter.entries({foo: 42}));

assert<
  IterableIterator<[string, string | null]>
>(iter.entries({foo: "", bar: null}));

assert<
  IterableIterator<[string, never]>
>(iter.entries({}));
