Rate-limits `source`, ensuring that requests for the next value in `source` are made at intervals of no less than `intervalMs` milliseconds. Yields the same values in the same order as `source`.

```js
async function* pollHealth() {
  while (true) {
    yield fetch('/health').json();
  }
}

for (const response of asyncThrottle(100, pollHealth)) {
  // This happens only once every 100 milliseconds
  renderHealth(response);
}
```
