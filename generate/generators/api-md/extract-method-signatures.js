'use strict';

const { astMatch, includes, oneOf } = require('./ast-match');

const curryNames = ['iterableCurry', 'asyncIterableCurry'];

function range(start, end) {
  const idxs = [];
  for (let i = start; i < end; i++) {
    idxs.push(i);
  }
  return idxs;
}

const splice = (arr, start, count) => {
  arr = [...arr];
  arr.splice(start, count);
  return arr;
};

function methodUsesIterableCurry(ast) {
  let curryMethod = null;
  let usesIterableCurry = false;
  const iterableCurryOpts = {
    variadic: false,
    reduces: false,
  };

  for (const stmt of ast.program.body) {
    if (
      astMatch(
        {
          type: 'ImportDeclaration',
          specifiers: includes({
            type: 'ImportSpecifier',
            imported: {
              name: oneOf(...curryNames),
            },
          }),
          source: {
            value: oneOf('../../internal/iterable', '../../internal/async-iterable'),
          },
        },
        stmt,
      )
    ) {
      curryMethod = stmt.specifiers.find((specifier) =>
        curryNames.includes(specifier.imported.name),
      ).imported.name;
    } else if (
      curryMethod &&
      astMatch(
        {
          type: 'ExportDefaultDeclaration',
          declaration: {
            type: 'CallExpression',
            callee: {
              name: curryMethod,
            },
          },
        },
        stmt,
      )
    ) {
      usesIterableCurry = true;
      const [, optsAst] = stmt.declaration.arguments;

      if (optsAst && optsAst.type === 'ObjectExpression') {
        for (const propertyAst of optsAst.properties) {
          if (propertyAst.type === 'ObjectProperty' && /Literal$/.test(propertyAst.value.type)) {
            iterableCurryOpts[propertyAst.key.name] = propertyAst.value.value;
          }
        }
      }
    }
  }
  return { usesIterableCurry, iterableCurryOpts };
}

function getParams(methodName, ast) {
  let params;

  for (const stmt of ast.program.body) {
    if (
      astMatch(
        {
          type: 'ExportNamedDeclaration',
          declaration: {
            type: 'FunctionDeclaration',
            id: {
              name: methodName,
            },
          },
        },
        stmt,
      )
    ) {
      const methodDeclaration = stmt.declaration;
      params = methodDeclaration.params.map((param) => {
        let paramDecl;
        let isRest = false;

        switch (param.type) {
          case 'AssignmentPattern':
            paramDecl = param.left;
            break;
          case 'RestElement':
            paramDecl = param.argument;
            isRest = true;
            break;
          default:
            paramDecl = param;
            break;
        }
        if (paramDecl.type === 'ObjectPattern') {
          return {
            name: null,
            isRest: false,
            properties: paramDecl.properties
              .filter((prop) => prop.shorthand)
              .map((prop) => prop.key.name),
          };
        } else {
          return {
            name: paramDecl.name,
            isRest,
          };
        }
      });
    }
  }

  return params;
}

// Reverse any munging that iterableCurry does to params
function uncurryParams(ASYNC, params, { variadic }) {
  params[0].isIterable = true;
  params[0].isAsync = ASYNC;

  if (variadic) params[0].isRest = true;

  params.push(params.shift());
}

function getSignatureOverrides(ASYNC, params, docme) {
  return docme.signatures.map((docParams) =>
    docParams
      .map((param) =>
        param.isIterable
          ? {
              ...param,
              isAsync: param.isAsync == null ? ASYNC : param.isAsync,
            }
          : param,
      )
      .concat(params.filter((param) => param.isIterable)),
  );
}

module.exports = function extractMethodSignatures(methodName, ast, docme) {
  const ASYNC = methodName.startsWith('async');
  const { usesIterableCurry, iterableCurryOpts } = methodUsesIterableCurry(ast);
  const params = getParams(methodName, ast);

  if (params && usesIterableCurry) {
    uncurryParams(ASYNC, params, iterableCurryOpts);
  }

  if (docme.signatures) {
    return getSignatureOverrides(ASYNC, params || [], docme);
  } else if (!params) {
    return null;
  } else if (!usesIterableCurry) {
    return [params];
  } else {
    const { minArgs = params.length, maxArgs = params.length } = iterableCurryOpts;

    return range(0, maxArgs - minArgs + 1).map((configParamsLen) =>
      splice(
        params,
        iterableCurryOpts.optionalArgsAtEnd ? maxArgs - configParamsLen : 0,
        configParamsLen,
      ),
    );
  }
};
