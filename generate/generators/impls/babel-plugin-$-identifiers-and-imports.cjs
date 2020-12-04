'use strict';

const { renameDollar } = require('../../names.cjs');

function renameImport(path, ASYNC) {
  return path.replace(/(^|.\/)\$([^/]*)$/, ASYNC ? '$1async-$2' : '$1$2');
}

// Copied w/ minor changes. TODO, see if this can be exposed or reused somehow?
const renameVisitor = {
  ReferencedIdentifier({ node }, state) {
    if (node.name === state.name) {
      node.name = state.newName;
    }
  },

  Scope(path, state) {
    if (!path.scope.bindingIdentifierEquals(state.name, state.binding.identifier)) {
      path.skip();
    }
  },

  'AssignmentExpression|Declaration'(path, state) {
    const ids = path.getOuterBindingIdentifiers();

    for (const name in ids) {
      if (name === state.name) ids[name].name = state.newName;
    }
  },
};

function forceRename(path, name, newName) {
  // A normal path.scope.rename will split
  // ```
  // export function $foo() {}`
  // ```
  // into
  // ```
  // function foo() {}
  // export { foo as $foo }
  // ```
  // This is difficult to reverse. It was easier to separate out
  // the core of the renaming logic.

  const binding = path.scope.getBinding(name);
  const { scope } = binding;

  scope.traverse(scope.block, renameVisitor, { name, newName, binding });

  scope.removeOwnBinding(name);
  scope.bindings[newName] = binding;
  binding.identifier.name = newName;
}

module.exports = function resolveDollarIdentifiersAndImports({ types: t }, { ASYNC }) {
  const visitor = {
    'VariableDeclarator|ClassDeclaration|FunctionDeclaration'(path, state) {
      const { name } = path.node.id;

      if (name && name.startsWith('$')) {
        forceRename(path, name, renameDollar(name, ASYNC));
      }
    },

    Identifier(path, state) {
      const { node } = path;
      const { name } = node;

      if (name.startsWith('$') && /\.d\.ts$/.test(state.filename)) {
        // Babel doesn't understand the scope of type definitions.
        // Instead we just rename the symbols where we find them.
        const newName = renameDollar(name, ASYNC);

        node.name = newName;
      }
    },

    Program(path, state) {
      const { body } = path.node;

      const isTs = /\.d\.ts$/.test(state.filename);

      const declsBySource = new Map();

      for (let i = body.length - 1; i >= 0; i--) {
        const decl = body[i];

        if (!(t.isImportDeclaration(decl) || t.isExportNamedDeclaration(decl))) {
          continue;
        }

        const { source, specifiers, declaration } = decl;
        if (source) {
          if (/\.macro(\.c?js)$/.test(source.value)) {
            continue;
          }
          source.value = renameImport(source.value, ASYNC);

          if (declsBySource.has(source.value)) {
            const idx = declsBySource.get(source.value);
            const otherDecl = body[idx];
            if (otherDecl.type === decl.type) {
              specifiers.push(...otherDecl.specifiers);
              body.splice(idx, 1); // remove other decl
            }
          }

          declsBySource.set(source.value, i);
        }

        if (isTs) continue;

        if (declaration) {
          if (declaration.declaration) {
            const { id } = declaration;
            forceRename(path, id.name, renameDollar(id.name, ASYNC));
          } else if (declaration.declarations) {
            const { declarations } = declaration;
            for (const declaration of declarations) {
              const { id } = declaration;
              forceRename(path, id.name, renameDollar(id.name, ASYNC));
            }
          }
        }

        if (specifiers) {
          const specsByRemoteName = new Map();

          for (let j = specifiers.length - 1; j >= 0; j--) {
            const specifier = specifiers[j];
            const { imported, exported, local } = specifier;
            const remote = imported || exported;
            if (imported) imported.name = renameDollar(imported.name, ASYNC);
            if (exported) exported.name = renameDollar(exported.name, ASYNC);
            if (local) {
              path.scope.rename(local.name, renameDollar(local.name, ASYNC));
            }
            if (remote) {
              const existing = specsByRemoteName.get(remote.name);
              if (existing && existing.local.name === local.name) {
                specifiers.splice(j, 1);
                continue;
              }
              specsByRemoteName.set(remote.name, specifier);
            }
          }
        }
      }
    },
  };

  return {
    name: '$-identifiers-and-imports',
    visitor,
  };
};
