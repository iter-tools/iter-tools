export function delay(ms, output) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (output instanceof Error) {
        reject(output);
      } else {
        resolve(output);
      }
    }, ms),
  );
}
