const readChunk = require('read-chunk');

const magicComment = '@generated-from';

function isGeneratedFromTemplate(path) {
  let preamble;

  try {
    preamble = readChunk.sync(path, 7, magicComment.length).toString();
  } catch (e) {}

  return preamble === magicComment;
}

module.exports = { isGeneratedFromTemplate };
