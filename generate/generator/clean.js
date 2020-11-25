'use strict';

const fs = require('fs');
const { traverse } = require('./traverse');
const { isGeneratedFromTemplate } = require('./comments');
const { handleError } = require('./utils');

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
