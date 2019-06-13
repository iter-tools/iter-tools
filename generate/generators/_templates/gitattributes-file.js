module.exports = generatedPaths =>
  `# @generated
# It should not be necessary to edit this file directly.
# The template for this file is: generate/templates/gitattributes-file.js

${[...generatedPaths]
  .sort()
  .map(path => `${path} linguist-generated=true`)
  .join('\n')}
`;
