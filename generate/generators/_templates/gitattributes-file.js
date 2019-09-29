const fs = require('fs');
const ignore = require('ignore');

module.exports = generatedPaths => {
  const gitignore = ignore().add(fs.readFileSync('.gitignore', 'utf8'));

  return `# @generated
# It should not be necessary to edit this file directly.
# The template for this file is: generate/templates/gitattributes-file.js

${[...generatedPaths]
  .filter(path => !gitignore.ignores(path))
  .sort()
  .map(path => `${path} linguist-generated=true`)
  .join('\n')}
`;
};
