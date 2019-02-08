import range from './range'
import zip from './async-zip'

export default function asyncEnumerate (iterable, start = 0) {
  return zip(range({ start }), iterable)
}
