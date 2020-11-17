'use strict';

module.exports = (error, generatedFrom) =>
  `/**
 * @generate-failed
 * @generated-from ./${generatedFrom}
 */
throw new Error(\`${error.stack}\`)
`;
