const { sep } = require('path');

module.exports = {
  comments: false,
  plugins: ['@babel/plugin-syntax-typescript'],
  ignore: [/[^.][^d]\.ts$/, new RegExp(`\\${sep}\\$[^\\${sep}]*$`)],
};
