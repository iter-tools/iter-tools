const Generator = require('yeoman-generator');
const recursiveRead = require('recursive-readdir');
const decamelize = require('decamelize');
const { relative, join } = require('path');

function throwOnValidationError(message) {
  if (message && typeof message === 'string') {
    throw new Error(message);
  } else if (message === false) {
    throw new Error();
  }
}

function combineMessages(...messages) {
  for (const message of messages) {
    if (message === false || typeof message === 'string') {
      return message;
    }
  }
  return true;
}

function validateNameOnly(name) {
  if (!/\w+/.test(name)) {
    return 'Method name must consist of word characters';
  }
  if (name.startsWith('$')) {
    return 'Method name must not begin with $';
  }
  return true;
}

function validateNameWithAsync(name, isAsync) {
  if (isAsync && !/^async[A-Z]/.test(name)) {
    return 'Method name must begin with async, e.g. asyncMethod';
  } else if (!isAsync && name.startsWith('async')) {
    return 'Method name cannot start with async if method type is not async';
  }
  return true;
}

function validateName(name, isAsync) {
  return combineMessages(validateNameOnly(name), validateNameWithAsync(name, isAsync));
}

const asyncPrompt = [
  {
    type: 'list',
    name: 'async',
    message: 'What kind of iterables will your method work on?',
    choices: ['sync', 'async', 'both'],
  },
];

const makeOtherPrompts = isAsync => [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the name for your new method:',
    validate(input) {
      if (input.trim() === '') {
        return 'Method name cannot be empty';
      }

      return validateName(input, isAsync);
    },
  },
  {
    type: 'confirm',
    name: 'reduces',
    message: 'Are you reducing an iterable to a single value?',
  },
];

class BaseGenerator extends Generator {
  usage() {
    return (
      'npm run create:method -- [name] [options]' + '\n  ' + 'yarn create:method [name] [options]'
    );
  }
}

class MethodGenerator extends BaseGenerator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', { required: false });
    this.option('reduces', {
      desc: 'Whether the method returns a single value (as opposed to yielding many).',
      alias: 'r',
    });
    this.option('maps', {
      desc: 'Whether the method yields many values (as opposed to returning one).',
      alias: 'm',
    });
    this.option('sync', {
      desc: 'Whether the method should have a sync implementation',
      alias: 's',
    });
    this.option('async', {
      desc: 'Whether the method should have an async implementation',
      alias: 'a',
    });
    this.option('both', {
      desc: 'The equivalent of --sync and --async. Method name will be prefixed with $',
      alias: 'b',
    });
    this._options['force-install'].hide = true;
    this._options['skip-install'].hide = true;
    this._options['skip-cache'].hide = true;

    const { name, maps, reduces, both, sync, async } = this.options;

    if (maps && reduces) {
      throw new Error('Cannot specify both --maps and --reduces.');
    }

    this._arguments = {
      name,
      reduces: reduces ? true : maps ? false : undefined,
      async: both || (sync && async) ? 'both' : async ? 'async' : sync ? 'sync' : undefined,
    };

    if (name !== undefined) {
      throwOnValidationError(validateNameOnly(name));
      if (this._arguments.async !== undefined) {
        throwOnValidationError(validateNameWithAsync(name, this._arguments.async === 'async'));
      }
    }
  }

  async prompting() {
    if (!this._arguments.async) {
      Object.assign(this._arguments, await this.prompt(asyncPrompt));
    }

    const isAsync = this._arguments.async === 'async';

    if (this._arguments.name !== undefined) {
      throwOnValidationError(validateName(this._arguments.name, isAsync));
    }

    const prompts = makeOtherPrompts(isAsync);
    const necessaryPrompts = prompts.filter(prompt => this._arguments[prompt.name] === undefined);

    if (necessaryPrompts.length) {
      Object.assign(this._arguments, await this.prompt(necessaryPrompts));
    }
  }

  async writing() {
    const { name, reduces, async } = this._arguments;
    const both = async === 'both';
    const asyncType = both ? '$' : this._arguments.async;
    const methodType = reduces ? 'reducing' : 'mapping';
    const dasherizedName = decamelize(name, '-');
    const fileName = both ? `$${dasherizedName}` : dasherizedName;
    const template = this.templatePath(`${asyncType}-${methodType}`);

    const paths = await recursiveRead(template);

    for (const path of paths.map(path => relative(template, path))) {
      this.fs.write(
        this.destinationPath(
          join(`src/methods/${fileName}`, path.replace(/\bmethod\b/g, dasherizedName)),
        ),
        this.fs.read(join(template, path)).replace(/\b__method__\b/g, name),
      );
    }
  }
}

module.exports = MethodGenerator;
