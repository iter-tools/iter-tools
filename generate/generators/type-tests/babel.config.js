'use strict';

module.exports = api => {
  api.cache(true);

  return {
    babelrc: false,
    comments: false,
    plugins: ['@babel/plugin-syntax-typescript'],
  };
};
