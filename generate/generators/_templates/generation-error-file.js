module.exports = (error, generatedFrom) =>
  `/**
 * @generate-failed
 * @generated-from ./${generatedFrom}
 */
throw new Error(${JSON.stringify(error.stack)})
`;
