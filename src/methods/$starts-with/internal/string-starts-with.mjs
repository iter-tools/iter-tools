export function stringStartsWith(str, substr, compare) {
  if (compare === Object.is && str.startsWith) {
    return str.startsWith(substr);
  }

  let i = 0;
  for (const char of substr) {
    if (!compare(char, str[i])) {
      break;
    }
    i++;
  }
  return i === substr.length;
}
