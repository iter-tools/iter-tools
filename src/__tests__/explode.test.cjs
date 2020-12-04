const { default: pluginTester } = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');

// For now this must be run manually. To run it you must first do
// ln -s ../ node_modules/iter-tools-es
// It should be possible to fix this once resolve supports self references
// (and a version that does is integrated into babel-plugin-macros).
// https://github.com/browserify/resolve/pull/224

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('explode.macro', () => {
  pluginTester({
    plugin,
    title: 'explode.macro',
    snapshot: true,
    babelOptions: {
      filename: __filename,
    },
    tests: [
      `
      import 'above';
      import { map as snap, dropWhile } from 'iter-tools-es/src/explode.macro.cjs';
      import { tap, __tap } from 'iter-tools-es/src/explode.macro.cjs';
      import 'below';
    `,
    ],
  });
});

// I can't keep the snapshot for a disabled test, so when turning it back on make
// sure the output is as expected:
/*
import 'above';
import { map as snap } from 'iter-tools-es/methods/map';
import { dropWhile } from 'iter-tools-es/methods/drop-while';
import { tap } from 'iter-tools-es/methods/tap';
import { __tap } from 'iter-tools-es/__methods/tap';
import 'below';
*/
