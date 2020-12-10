'use strict';

const param = (methodName, { name, isRest, isOptional, isIterable, isAsync, properties }) => {
  if (isIterable) {
    const iterableType = methodName.startsWith('__') ? 'iterable' : 'wrappable';
    name = `[${name}](#${isAsync ? 'async' : ''}${iterableType})`;
  } else if (name === 'compare') {
    name = `[${name}](#compare)`;
  }
  let result = name === null ? `{ ${properties.join(', ')} }` : name;
  if (isRest) result = `...${result}`;
  if (isOptional) result = `?${result}`;
  return result;
};

const signature = ({ name, params }) => {
  return `**${name}(${params.map((p) => param(name, p)).join(', ')})**  `;
};

module.exports = (signatures) => {
  return signatures.map(signature).join('\n');
};
