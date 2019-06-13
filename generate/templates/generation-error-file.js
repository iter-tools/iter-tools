module.exports = (generatedFrom, error) =>
`/**
 * @generate-failed
 * @generated-from ./${generatedFrom}
 */
throw new Error(${JSON.stringify(error.toString())})
`;
