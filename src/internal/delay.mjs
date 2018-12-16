export default function delay (ms, output) {
  if (ms <= 0) {
    return output instanceof Error ? Promise.reject(output) : Promise.resolve(output)
  }
  return new Promise((resolve, reject) => setTimeout(() => {
    if (output instanceof Error) {
      reject(output)
    } else {
      resolve(output)
    }
  }, ms))
}
