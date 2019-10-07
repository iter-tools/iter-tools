'use strict';

const param = ({ name, isRest, isOptional, isIterable, isAsync, properties }) => {
  if (isIterable) {
    name = `[${name}](#${isAsync ? 'async' : ''}sourceiterable)`;
  }
  let result = name === null ? `{ ${properties.join(', ')} }` : name;
  if (isRest) result = `...${result}`;
  if (isOptional) result = `?${result}`;
  return result;
};

const signature = (methodName, params) => {
  return `**${methodName}(${params.map(param).join(', ')})**`;
};

module.exports = (methodName, signatures) => {
  return signatures.map(params => signature(methodName, params)).join('  \n');
};
