# Contributing

We welcome contributions! Please read this document. It can save you work!

[Etiquette](#etiquette)  
[What you need](#what-you-need)  
[Creating a new method](#creating-a-new-method)  
[Repository structure](#repository-structure)  
[Code formatting](#code-formatting)  
[Making a PR](#making-a-pr)  
[Prerelease checks](#prerelease-checks)  
[Publish a prerelease](#publish-a-prerelease)  
[Publish a new release](#publish-a-new-release)

## Etiquette

We hope you are finding iter-tools useful and are glad you would like to contribute. Thank you! Working on an open source project like this should be a rewarding and instructive experience. To keep it that way we will enforce our [code of conduct](CODE_OF_CONDUCT.md), so be sure to read and follow it.

The project is actively maintained, so your issues and PRs will definitely be seen and considered. Here are some great ways to start contributing:

- Creating an issue detailing a problem you've run into
- Create a bug fix PR for an obvious inconsistency
- Create a discussion issue to find out if new features or broader changes are feasable
- Come to our gitter channel and ask a question
- Improve our documentation, or this document to reflect your experience using and modify the library!

## What you need

To contribute you will need `node@>12`. You will also need the [yarn package manager](https://classic.yarnpkg.com/en/docs/install/).

### The code generator

You'll also need to run our code generator.
First install its dependencies with `yarn install`
Now you can run the generator one of the following ways:

```
> yarn generate # to build once, OR
> yarn generate:watch # to continuously update generated files OR
> yarn generate:watch -- --watchman # more efficient, but expects watchman to be in your PATH
```

We recommend that you run the generator in watch mode whenever you are developing. If you do not, you might discover later that tests have been running against old versions of generated code. For more details on the code generator, take a look at its README.

## $ on the command line

Some paths in this repo have a literal `$` in them. This has special meaning in shells, and you must escape it with a `\` or by putting the whole path inside single quotes. Be especially careful with any destructive command. **The fastest way to lose all your work is to run**:

```
rm -rf src/impls/$some-method/
# because it evaluates as
rm -rf src/impls/
# Yes, I did it once >_<
```

Furthermore when running jest and attempting to focus a single test suite you must remember that jest is expecting a regex, so the correct command doubly escapes the `$`, e.g. `npx jest 'src/impls/\$method/'`.

## Creating a new method

We've made it very easy to get started with creating a new method. Just run:

```
yarn create:method
```

An interactive prompt will guide you through the choices you need to make.

From there you can fill in your impelementation, tests, types, and README.

Do note that while we want welcome new methods, not all methods belong in iter-tools. Any addition must be discussed, and could be rejected. When we are considering the addition of new methods to the library, we have some basic criteria we use to determine whether a method would add value for us. Indications for creation of a new method are:

- The need for the implementation is very common.
- The implementation is complicated and/or bug-prone.
- The name very clearly implies the implementation.

Indications against the creation of a new method include:

- Concerns are mixed, such that it would be better to offer two (or more) methods.
- Nobody knows of a real-world use case for the method.

## Repository structure

```
generate/                Anything pertaining to code generation
├─ generator/               Code generator code (which should become its own package)
├─ generators/              Code which describes how/when/where to generated each type of file
└─ async.macro.js           You'll see this imported in most $ files. Read its docs!!

generate-yo/			 The yeoman generation code and templates. Used by the create:method script.

src/
├- internal/             Shared code used by many methods
├─ methods/              One folder per method. $some-method means "someMethod and asyncSomeMethod"
│  └─ $my-method/
│      ├─ __tests__         Jest tests. *.test.js is copied to *.spec.ts and type checked.
│      │  └─ $my-method.test.js
│      ├─ $my-method.js     The method implementation. Default export is exported from library
│      ├─ $my-method.d.ts   The method types. Default export is exported from library
│      └─ README.md         Method documentation. Will be intergrated into API.md and website
├─ test/                 Shared code used in tests
├- index.d.ts            Typedefs for index
└─ index.mjs             Main entry point
```

I've omitted the generated files (aside from the indexes) from the above tree, simply because you shouldn't need to modify them. All generated files begin with a leading comment that tell you which file you need to edit in order to alter its contents. If there is no such leading comment, the file is safe to change.

## Testing

Our tests are run with `npx jest`. Some use snapshots which can become out of date. These can be updating with `npx jest -u`, however if you run this command be sure to check that the changes in the snapshots are what you expect them to be. Jest test operate on code that is the output of the code generator, so be sure that that has run. This is easiest the generator is running in watch mode in the background. As long as the generator is watching you should always be testing your latest changes. You can also force testing of built packages by running `PKGS=true npx jest`. Note that this will cause jest to test the content of the `/dist` folder, meaning you must have built the `/dist` folder with `npm run build`. If you have the generator watching already `rm -rf dist && npm run :build` will be sufficient.

## Code formatting

The code in this project is autoformatted with Prettier. To format your code, run the command:

```
> yarn format
```

or better yet, configure prettier format-on-save for your editor.

If your text editor has an [editorconfig](http://EditorConfig.org) plugin, your indentation and line settings should already be correct.

## Making a PR

We are happy to review and merge PRs. To be accepted a change must have test coverage. If it is an API change, it must also have:

- Updated documentation
- An entry in the CHANGELOG
- A correct typescript definition

Please ask in the PR if you need any help.

## Publish a new release

For the sake of example we will assume we are releasing `v1.2.3`.

First make the release commit on the `trunk` branch. At the moment none of the changes described below can be validated by our CI process.

In `README.md` update the "API docs" link with the tag for the version being released. The link would be to `https://github.com/iter-tools/iter-tools/blob/v1.2.3/API.md`. This prevents users seeing documentation for unreleased features.

In `CHANGELOG.md` fill in the version and date of the release, and make sure there is a new blank `UNRELEASED` section at the top of the file. Patch releases generally should not require changelog updates -- that is what the issue tracker is for.

In `package.json` update the `version` field.

`git commit -am 1.2.3 && git tag v1.2.3`

`git push && git push --tags`

Now to publish on NPM. First build the packages to be published. We do not publish from the project root. I have hardcoded an error should you attempt to do that. So:

`yarn build`

`pushd dist/es5`
`yarn publish` (You can leave the version input empty)
`popd`
`pushd dist/es`
`yarn publish`
`popd`

On [gitter](https://gitter.im/iter-tools/community) post a message of the following form (replacing the changelog link with a link to the new version's section in [CHANGELOG.md](https://github.com/iter-tools/iter-tools/blob/trunk/CHANGELOG.md)):

```
`v1.2.3` is released. See [CHANGELOG.md](https://github.com/iter-tools/iter-tools/blob/trunk/CHANGELOG.md#123---2020-2-20) for details.
```

And that's it!
