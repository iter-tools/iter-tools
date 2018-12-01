export default function when (condition) {
  return {
    * add (item) {
      if (condition) yield item
    },
    * concat (items) {
      if (condition) yield * items
    },
    assign (obj) {
      return condition ? obj : {}
    }
  }
}
