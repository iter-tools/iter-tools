'use strict';

function isObject(value) {
  return value && typeof value === 'object';
}

class OneOf {
  constructor(values) {
    this.values = values;
  }

  _match(astValue) {
    return !!this.values.find((value) => astMatch(value, astValue));
  }
}

const oneOf = (...values) => new OneOf(values);

class Includes {
  constructor(value) {
    this.value = value;
  }

  _match(astValue) {
    return !!astValue.find((astItem) => astMatch(this.value, astItem));
  }
}

const includes = (value) => new Includes(value);

function astMatch(value, astValue) {
  if (typeof value._match === 'function') {
    return value._match(astValue);
  } else if (isObject(value) && isObject(astValue)) {
    return Object.keys(value).every((key) => astMatch(value[key], astValue[key]));
  } else {
    return value === astValue;
  }
}

module.exports = { astMatch, oneOf, includes };
