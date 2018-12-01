import assert from 'static-type-assert'
import * as iter from '../index'

declare var condition: boolean

type MyObj = {str: 'hello', num: 4}

declare var myObj: MyObj

assert<Iterable<number>>(iter.when(condition).add(1))
assert<Iterable<string>>(iter.when(condition).concat(['a', 'b']))
assert<MyObj | {}>(iter.when(condition).assign(myObj))
assert<Partial<MyObj>>(
  {
    ...iter.when(condition).assign(myObj)
  }
)
