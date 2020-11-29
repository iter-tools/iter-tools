'use strict';

const { renameDollar, syncName } = require('../../names.cjs');
const methodSignaturesTemplate = require('./method-signatures.cjs');

function groupBy(accessor, arr) {
  const groups = new Map();
  for (const item of arr) {
    const key = accessor(item);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(item);
  }
  return groups;
}

function compare(a, b) {
  return a < b ? -1 : b < a ? 1 : 0;
}

function alphabetizationName(method) {
  return method.docme.alphabetizationName || method.name;
}

function compareNames(a, b) {
  return compare(syncName(alphabetizationName(a)), syncName(alphabetizationName(b)));
}

function compareGroups(a, b) {
  return sections.get(a).idx - sections.get(b).idx;
}

function* flat(iterables) {
  for (const iterable of iterables) {
    yield* iterable;
  }
}

const sections = new Map(
  [
    ['create', 'Create iterables'],
    ['object', 'Create iterables from objects'],
    ['structure', 'Use iterables from data structures'],
    ['transform', 'Transform a single iterable'],
    ['separate', 'Separate an iterable into multiple iterables'],
    ['combine', 'Combine multiple iterables'],
    ['reduce', 'Reduce an iterable to a single value'],
    ['permute', 'Combinatory iterables'],
    ['temporal', 'Control timing inside an async iterable'],
    ['cache', 'Cache an iterable'],
    ['consume', 'Consume an iterable'],
    ['predicate', 'Predicates (test a value)'],
    ['utility', 'Utilities'],
    ['higher-order', 'Generator helpers'],
    [undefined, 'Uncategorized'],
  ].map(([section, title], idx) => [section, { title, idx }]),
);

const seeMethodTemplate = (name) => `See [${name}](#${name.toLowerCase()})\n`;

const methodAliasesTemplate = (doc) => {
  const {
    docme: { aliases },
  } = doc;
  if (!aliases || !aliases.length) return '';
  return `Aliases: ${aliases.map((alias) => `\`${alias}\``).join(',')}\n\n`;
};

const methodTemplate = (doc, aliasMap) => {
  const { name, readme, isAsyncClone } = doc;
  const seeName = aliasMap.get(name) || (isAsyncClone ? syncName(name) : null);
  const see = seeName && seeMethodTemplate(seeName);
  const aliases = methodAliasesTemplate(doc);
  const signatures = doc.signatures ? `${methodSignaturesTemplate(name, doc.signatures)}\n\n` : '';
  return `### ${name}\n\n${signatures}${aliases}${readme || see || 'Undocumented.'}\n`;
};

const typeSectionTemplate = (type, body) => `## ${sections.get(type).title}\n\n${body}\n`;

const linkTarget = (name, aliasMap) => (aliasMap.get(name) || name).toLowerCase();

const tocMethodTemplate = (doc, aliasMap) => {
  const {
    name,
    docme: { hasParallel },
  } = doc;

  const normalName = renameDollar(name, false);
  const asyncName = renameDollar(name, true);

  const parts = [`[${normalName}](#${linkTarget(normalName, aliasMap)})`];

  if (normalName !== asyncName) {
    parts.push(`([async](#${linkTarget(asyncName, aliasMap)}))`);
  }

  if (hasParallel) {
    const parallelName = `${asyncName}Parallel`;
    parts.push(`([parallel-async](#${linkTarget(parallelName, aliasMap)}))`);
  }

  return `${parts.join(' ')}  \n`;
};

const tocTypeSectionTemplate = (type, body) => `${sections.get(type).title}\n\n${body}\n`;

function flattenDollars(methodsWithDollars) {
  return [
    ...flat(
      methodsWithDollars.map((doc) => {
        const originalName = doc.name;

        if (originalName[0] === '$') {
          return [false, true]
            .map((ASYNC) => {
              const name = renameDollar(originalName, ASYNC);

              return {
                name,
                docme: doc.docme,
                readme: ASYNC ? doc.asyncReadme : doc.readme,
                signatures: ASYNC ? doc.asyncSignatures : doc.signatures,
                isAsyncClone: ASYNC,
              };
            })
            .concat(
              doc.docme.hasParallel
                ? [
                    {
                      name: `${renameDollar(originalName, true)}Parallel`,
                      docme: doc.docme,
                      readme: doc.parallelReadme,
                      signatures: doc.parallelSignatures,
                      isAsyncClone: false,
                    },
                  ]
                : [],
            );
        } else {
          return [doc];
        }
      }),
    ),
  ];
}

function groupMethods(methods) {
  return [...groupBy((m) => m.docme.type, methods)].sort(([a], [b]) => compareGroups(a, b));
}

module.exports = (typesDoc, methodsWithDollars, aliasMap) => {
  methodsWithDollars = methodsWithDollars.sort(compareNames);

  // table of contents
  const toc = groupMethods(methodsWithDollars)
    .map(([type, methods]) =>
      tocTypeSectionTemplate(type, methods.map((doc) => tocMethodTemplate(doc, aliasMap)).join('')),
    )
    .join('');

  const methods = flattenDollars(methodsWithDollars);
  const docs = groupMethods(methods)
    .map(([type, methods]) =>
      typeSectionTemplate(type, methods.map((doc) => methodTemplate(doc, aliasMap)).join('')),
    )
    .join('');

  return `# The iter-tools API

[![Documentation is automatically generated](https://img.shields.io/static/v1?label=docs&message=generated&color=informational)](https://github.com/iter-tools/iter-tools/blob/master/CONTRIBUTING.md#the-code-generator)

The API documentation is split into to main sections: [types](#types) and [methods](#methods).

## Types

${typesDoc}

## Methods

${toc}\n${docs}`;
};
