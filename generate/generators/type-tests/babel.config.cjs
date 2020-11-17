'use strict';

module.exports = (api) => {
  api.cache(true);

  return {
    babelrc: false,
    plugins: ['@babel/plugin-syntax-typescript', 'babel-plugin-recast'],
  };
};
