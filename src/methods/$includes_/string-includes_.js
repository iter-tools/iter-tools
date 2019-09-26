export function stringIncludes_(str, { any }, value) {
  const values = any ? [...value] : [value];
  for (const value of values) {
    if (str.indexOf(value) >= 0) return true;
  }

  return false;
}
