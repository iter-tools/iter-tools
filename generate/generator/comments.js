const fs = require('fs');

function isGeneratedFromTemplate(path) {
  let generatedFromTag;

  try {
    const buf = Buffer.alloc(15);
    const fd = fs.openSync(path);
    try {
      // TODO find some way to get the @generated-from tag length and offset dynamically
      fs.readSync(fd, buf, 0, 15, 7);
    } finally {
      fs.closeSync(fd);
    }
    generatedFromTag = buf.toString();
  } catch (e) {}

  return generatedFromTag === '@generated-from';
}

module.exports = { isGeneratedFromTemplate };
