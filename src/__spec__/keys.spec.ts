import assert from "static-type-assert";
import * as iter from "../index";

assert<
  IterableIterator<string>
>(iter.keys({foo: "", bar: null}));

assert<
  IterableIterator<string>
>(iter.keys({}));

assert<
  IterableIterator<string>
>(iter.keys({0: "", 1: null}));
