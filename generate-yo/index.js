'use strict';

const yeoman = require('yeoman-environment');
const { resolve } = require('path');
const MethodGenerator = require('./generators/method');

const env = yeoman.createEnv();

env.registerStub(
  MethodGenerator,
  'iter-tools:method',
  resolve(__dirname, 'generators/method/index'),
);

env.run([`iter-tools:${process.argv[2]}`, ...process.argv.slice(3)]);
