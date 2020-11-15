export function factorial(n, to = 1) {
  // The to parameter can help us avoid overflows
  // We avoid multiplying in factors we'd later have to divide out
  if (n <= to) return 1;
  return n * factorial(n - 1, to);
}
