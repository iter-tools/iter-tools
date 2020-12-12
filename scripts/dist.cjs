#!/usr/bin/env node

const fs = require('fs');
const { sync: execa } = require('execa');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));
const target = argv._[0];

const mungeReadme = (content) => {
  const lines = content.split('\n');
  const npmBadgeIdx = lines.findIndex((line) =>
    line.includes('https://www.npmjs.com/package/iter-tools-es'),
  );
  if (npmBadgeIdx >= 0) {
    lines.splice(npmBadgeIdx, 1);
  }
  content = lines.join('\n');

  content = content.replace(
    /(#* ?Usage.*\n)(.|\n)*?^(?=#)/gim,
    (_, m1) => `${m1}\n${fs.readFileSync(`USAGE.${target}.md`, 'utf8')}\n`,
  );

  if (target === 'es5') {
    content = content
      .replace(/from 'iter-tools-es/g, "from 'iter-tools")
      .replace(/= require\('iter-tools-es/g, "= require('iter-tools");
  }

  return content;
};

const ignored = [
  '**/__tests__',
  'src/test',
  // 'src/index.js',
  // https://github.com/babel/babel/issues/12008
  'src/index-static.js',
  'src/index-static.d.ts',
];

function run(cmd) {
  const [bin, ...args] = cmd.split(' '); // Works because we don't have --arg='foo bar'
  console.log(`> ${cmd}`);
  const result = execa(bin, args);
  console.log('');
  return result;
}

run(
  `babel --config-file ./babel/${target}.config.cjs --keep-file-extension -x .js,.ts --ignore ${ignored.join(
    ',',
  )} src -d dist/${target}`,
);
run(
  `babel --config-file ./babel/no-comments.config.cjs --out-file-extension .mjs src/methods -d dist/${target}/methods`,
);
// run(`babel --plugins=./babel/plugins/index-commonjs.cjs src/index.js -o dist/${target}/index.js`);

/**
 * Weirdly this file does not require transpilation though the way it works changes.
 * This is because es modules importing cjs modules get the whole module.exports as the default export.
 * Files in the method links folder contain `module.exports = method;`, so when treated as es modules
 * they also do the correct thing, i.e. the method is the default export (as it was before).
 */
run(
  `babel --config-file ./babel/no-comments.config.cjs --out-file-extension .mjs src/index.js -o dist/${target}/index.mjs`,
);

run(`cp src/explode.macro.cjs dist/${target}/explode.macro.js`);

run(`cp LICENSE dist/${target}`);

fs.writeFileSync(`dist/${target}/README.md`, mungeReadme(fs.readFileSync('README.md', 'utf8')));

fs.writeFileSync(
  `dist/${target}/package.json`,
  run(`json -f package.json -f package.${target}.json --merge`).stdout,
);
