export function stringIndexOf(str, substr, compare, position = 0) {
  if (compare === Object.is) {
    return str.indexOf(substr, position);
  }

  for (let j = position; j < str.length - substr.length; j++) {
    let i = 0;
    for (const char of substr) {
      if (!compare(char, str[j + i])) {
        break;
      }
      i++;
    }
    if (i === substr.length) return j;
  }
  return -1;
}
