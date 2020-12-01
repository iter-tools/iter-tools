const { default: pluginTester } = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
      import 'above';
      import { map as snap, dropWhile } from '../explode.macro.cjs';
      import { tap } from '../explode.macro.cjs';
      import 'below';
    `,
  ],
});
