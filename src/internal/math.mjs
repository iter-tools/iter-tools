let toBigInt;
try {
  toBigInt = BigInt(1) && (n => BigInt(n)); // eslint-disable-line
} catch (e) {
  toBigInt = n => n;
}

export function factorial(n) {
  if (n === 0 || n === 1) return toBigInt(1);
  return toBigInt(n) * toBigInt(factorial(n - 1));
}

export function permutationsSize(len, r) {
  if (len === 0 || r === 0 || r > len) return 0;
  return Number(factorial(len) / factorial(len - r));
}

export function combinationsSize(len, r) {
  if (len === 0 || r === 0 || r > len) return 0;
  return Number(factorial(len) / (factorial(r) * factorial(len - r)));
}

export function combinationsWithReplacementSize(len, r) {
  if (len === 0 || r === 0 || r > len) return 0;
  return Number(factorial(len + r - 1) / (factorial(r) * factorial(len - 1)));
}
