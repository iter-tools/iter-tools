const staticGeneratedPaths = [
  '.gitattributes',
  'src/__test__/fns.js',
  'src/__test__/async-fns.js'
];

module.exports = (generatedPaths) =>
`# @generated
# It should not be necessary to edit this file directly.
# The template for this file is: templates/gitattributes-file.js

${
  [...staticGeneratedPaths, ...generatedPaths].map(
      path => `${path} linguist-generated=true`
  ).join('\n')
}
`;
