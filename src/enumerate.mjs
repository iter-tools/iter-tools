import range from './range'
import zip from './zip'

export default function enumerate (iterable, start = 0) {
  return zip(range({start}), iterable)
}
