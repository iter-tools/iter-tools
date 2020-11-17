'use strict';

const fs = require('fs');
const { traverse } = require('./traverse.cjs');
const { isGeneratedFromTemplate } = require('./comments.cjs');
const { handleError } = require('./utils.cjs');

module.exports = function clean(root, options) {
  traverse(root, options)
    .then((paths) => {
      for (const path of paths) {
        if (isGeneratedFromTemplate(path)) {
          fs.unlinkSync(path);
        }
      }
    })
    .catch(handleError);
};
