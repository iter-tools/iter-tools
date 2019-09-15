const decamelize = require('decamelize');
const { renameDollar } = require('../../names');

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

function syncName(name) {
  return name.startsWith('$') ? name[1].toLowerCase() + name.slice(2) : name;
}

function compareNames(a, b) {
  return compare(syncName(a), syncName(b));
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
    ['transform', 'Transform a single iterable'],
    ['separate', 'Separate an iterable into multiple iterables'],
    ['combine', 'Combine multiple iterables'],
    ['reduce', 'Reduce an iterable to a single value'],
    ['regex', 'Work with Regular Expressions'],
    ['permute', 'Combinatory iterables'],
    ['temporal', 'Control timing inside an async iterable'],
    ['cache', 'Cache an iterable'],
    ['consume', 'Consume an iterable'],
    ['utility', 'Utilities'],
    [undefined, 'Uncategorized'],
  ].map(([section, title], idx) => [section, { title, idx }]),
);

const methodTemplate = ({ name, readme, docme }) => `### ${name}\n${readme}\n`;

const seeMethodTemplate = name => `See [${name}](#${decamelize(name, '-')})\n`;

const typeSectionTemplate = (type, body) => `## ${sections.get(type).title}\n${body}\n`;

const contentsMethodTemplate = ({ name, docme: { hasParallel } }) => {
  return name[0] === '$'
    ? `[${renameDollar(name, false)}](#${decamelize(
        renameDollar(name, false),
        '-',
      )}) ([async](#${decamelize(renameDollar(name, true), '-')})) ${
        hasParallel
          ? `([parallel-async](#${`${decamelize(renameDollar(name, true), '-')}-parallel`}))`
          : ''
      }  \n`
    : `[${name}](#${decamelize(name, '-')})  \n`;
};

const contentsTypeSectionTemplate = (type, body) => `${sections.get(type).title}\n\n${body}\n`;

module.exports = methodsWithDollars => {
  const methodGroups = [...groupBy(m => m.docme.type, methodsWithDollars)]
    .sort(([a], [b]) => compareGroups(a, b))
    .map(([type, methods]) => [type, methods.sort((a, b) => compareNames(a.name, b.name))]);

  const docs = methodGroups
    .map(([type, methods]) => {
      const body = [
        ...flat(
          methods.map(originalDoc => {
            const originalName = originalDoc.name;

            if (originalName[0] === '$') {
              const syncName = renameDollar(originalName, false);
              const asyncName = renameDollar(originalName, true);

              return [false, true]
                .map(ASYNC => {
                  const name = renameDollar(originalName, ASYNC);

                  return methodTemplate({
                    name,
                    docme: originalDoc.docme,
                    readme: ASYNC
                      ? originalDoc.asyncReadme || seeMethodTemplate(syncName)
                      : originalDoc.readme,
                  });
                })
                .concat(
                  originalDoc.docme.hasParallel
                    ? [
                        methodTemplate({
                          name: `${renameDollar(originalName, true)}Parallel`,
                          docme: originalDoc.docme,
                          readme: originalDoc.parallelReadme || seeMethodTemplate(asyncName),
                        }),
                      ]
                    : [],
                );
            } else {
              return [methodTemplate(originalDoc)];
            }
          }),
        ),
      ].join('');

      return typeSectionTemplate(type, body);
    })
    .join('');

  const tableOfContents = methodGroups
    .map(([type, methods]) => {
      const body = methods.map(doc => contentsMethodTemplate(doc)).join('');

      return contentsTypeSectionTemplate(type, body);
    })
    .join('');

  return `# The iter-tools API
[![Documentation is automatically generated](https://img.shields.io/static/v1?label=docs&message=generated&color=informational)](https://github.com/iter-tools/iter-tools/blob/master/CONTRIBUTING.md#the-code-generator)

${tableOfContents}\n${docs}`;
};
