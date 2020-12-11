const getImportedName = (v) => v.defs[0].node.imported.name;

function nearestFunctionScope(scope, predicate) {
  let scope_ = scope;
  while (scope_.type !== 'global') {
    if (scope_.type === 'function') return scope_;
    scope_ = scope_.upper;
  }
  return null;
}

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'Ensure no impure calls are made',
    },
    fixable: 'code',
    schema: [], // no options
  },
  create: function (context) {
    const sourceCode = context.getSourceCode();
    const calls = [];

    return {
      CallExpression(node) {
        if (!nearestFunctionScope(context.getScope())) {
          calls.push(node);
        }
      },

      'Program:exit'() {
        const moduleScope = context.getScope().childScopes[0];

        // ???
        if (!moduleScope.resolve) {
          return;
        }

        for (const call of calls) {
          let { callee } = call;
          while (callee.type === 'MemberExpression') {
            callee = callee.object;
          }
          // ???
          if (callee.type !== 'Identifier') continue;
          const lookup = moduleScope.resolve(callee);
          // e.g. require()
          if (!lookup) continue;
          const variable = lookup.resolved;
          if (!variable || !variable.defs.length) continue;
          const calleeDef = variable.defs[0].node;

          if (
            calleeDef.imported &&
            calleeDef.parent.source &&
            !/\.macro(\.c?js)?$/.test(calleeDef.parent.source.value)
          ) {
            const comments = sourceCode.getCommentsBefore(call);

            if (!comments.length || comments[comments.length - 1].value !== '#__PURE__') {
              context.report({
                node: call.callee,
                message: 'Call to ' + getImportedName(variable) + ' is missing pure annotation',
                fix(fixer) {
                  return fixer.insertTextBefore(call, '/*#__PURE__*/ ');
                },
              });
            }
          }
        }
      },
    };
  },
};
