const { join, basename, dirname } = require('path');
const completeExtname = require('path-complete-extname');

module.exports = {
  stripExt(path) {
    return join(dirname(path), basename(path, completeExtname(path)));
  },
};
