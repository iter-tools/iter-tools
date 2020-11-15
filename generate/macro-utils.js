function* concat(...iterables) {
  for (const i of iterables) yield* i;
}

function getNextStatement(reference) {
  const { container } = reference.parentPath;
  const parentNode = reference.parent;
  const loopIdx = container.indexOf(parentNode) + 1;
  return container[loopIdx];
}

function getOnlyArgument(reference, refName) {
  const { arguments: args } = reference.parent;

  if (args.length !== 1) {
    throw new Error(`The ${refName}() macro takes exactly one argument`);
  }

  return args[0];
}

module.exports = { concat, getNextStatement, getOnlyArgument };
