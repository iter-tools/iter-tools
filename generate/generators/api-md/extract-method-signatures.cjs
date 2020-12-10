'use strict';

const { astMatch, includes, oneOf } = require('./ast-match.cjs');

const curryNames = ['iterableCurry', 'asyncIterableCurry'];

function range(start, end) {
  const idxs = [];
  for (let i = start; i < end; i++) {
    idxs.push(i);
  }
  return idxs;
}

function* arrayReverse(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    yield arr[i];
  }
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
            value: oneOf('../../internal/iterable.js', '../../internal/async-iterable.js'),
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
          type: 'ExportNamedDeclaration',
          declaration: {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'CallExpression',
                  callee: {
                    name: curryMethod,
                  },
                },
              },
            ],
          },
        },
        stmt,
      )
    ) {
      usesIterableCurry = true;
      const [, optsAst] = stmt.declaration.declarations[0].init.arguments;

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

function getSignature(methodName, ast) {
  let name;
  let params;

  for (const stmt of ast.program.body) {
    if (
      astMatch(
        {
          type: 'ExportNamedDeclaration',
          declaration: {
            type: 'FunctionDeclaration',
            id: {
              name: oneOf(methodName, `__${methodName}`),
            },
          },
        },
        stmt,
      )
    ) {
      name = stmt.declaration.id.name;

      const methodDeclaration = stmt.declaration;
      params = methodDeclaration.params.map((param) => {
        let paramDecl;
        let isRest = false;
        let isOptional = false;

        switch (param.type) {
          case 'AssignmentPattern':
            paramDecl = param.left;
            isOptional = true;
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
            isOptional,
            properties: paramDecl.properties
              .filter((prop) => prop.shorthand)
              .map((prop) => prop.key.name),
          };
        } else {
          return {
            name: paramDecl.name,
            isRest,
            isOptional,
          };
        }
      });
      break;
    }
  }

  return name && { name, params };
}

// Reverse any munging that iterableCurry does to params
function uncurryParams(params, { variadic, growRight }) {
  let [itParam, ...cfgParams] = params;
  if (variadic) itParam = { ...itParam, isRest: true };
  cfgParams = cfgParams.map((param) => ({ ...param, isOptional: false }));
  return [...(growRight ? cfgParams : arrayReverse(cfgParams)), itParam];
}

function getSignatureOverrides(ASYNC, signature, docme) {
  const { name, params } = signature;
  const __ = name.startsWith('__');
  const configOverloads = docme.signatures.map((docParams) => ({
    name: __ ? name.slice(2) : name,
    params: docParams
      .map((param) =>
        param.isIterable
          ? {
              ...param,
              isAsync: param.isAsync == null ? ASYNC : param.isAsync,
            }
          : param,
      )
      .concat(params.filter((param) => param.isIterable)),
  }));

  return configOverloads;
}

module.exports = function extractMethodSignatures(methodName, ast, docme) {
  const ASYNC = methodName.startsWith('async');
  const { usesIterableCurry, iterableCurryOpts } = methodUsesIterableCurry(ast);
  const signature = getSignature(methodName, ast);

  if (signature && usesIterableCurry) {
    signature.params[0].isIterable = true;
    signature.params[0].isAsync = ASYNC;
  }

  let result;
  if (docme.signatures) {
    result = getSignatureOverrides(ASYNC, signature || { name: methodName, params: [] }, docme);
  } else if (signature) {
    const { params } = signature;
    if (!usesIterableCurry) {
      result = [{ name: methodName, params }];
    } else {
      const { minArgs = params.length, maxArgs = params.length } = iterableCurryOpts;

      const uncurried = uncurryParams(params, iterableCurryOpts);
      result = range(0, maxArgs - minArgs + 1).map((configParamsLen) => ({
        name: methodName,
        params: splice(
          uncurried,
          iterableCurryOpts.growRight ? maxArgs - configParamsLen : 0,
          configParamsLen,
        ),
      }));
    }
  }

  if (signature && signature.name.startsWith('__')) {
    let { name, params } = signature;
    if (usesIterableCurry) {
      const { minArgs = params.length } = iterableCurryOpts;
      params = params.map((param, i) => (i <= minArgs ? param : { ...param, isOptional: true }));
    }
    result.push({ name, params });
  }
  return result;
};
