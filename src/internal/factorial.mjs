let toBigInt;
try {
  toBigInt = BigInt(1) && (n => BigInt(n)); // eslint-disable-line
} catch (e) {
  toBigInt = n => n;
}

export default function factorial(n) {
  if (n === 0 || n === 1) return toBigInt(1);
  return toBigInt(n) * toBigInt(factorial(n - 1));
}
