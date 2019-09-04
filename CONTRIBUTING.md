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
To contribute you will need at least node version 8. We do test our code against language functionality (async generators) that exists only in node 10+, but our CI environment will handle that for you.

You'll also need to run our code generator.
First install its dependencies with `npm install`
Now you can run the generator one of the following ways:
```
> npm run generate # to build once, OR
> npm run generate:watch # to continuously update generated files OR
> npm run generate:watch -- --watchman # more efficient, but expects watchman to be in your PATH
```

We recommend that you run the generator in watch mode whenever you are developing. If you do not, you might discover later that tests have been running against old versions of generated code. For more details on the code generator, take a look at its README.

## Creating a new method
We've made it very easy to get started with creating a new method. Just run:
```
npm run create:method
```
An interactive prompt will guide you through the choices you need to make.

From there you can fill in your impelementation, tests, types, and README.

Do note that while we want welcome new methods, not all methods belong in iter-tools. Any addition must be discussed, and could be rejected. When we are considering the addition of new methods to the library, we have some basic criteria we use to determine whether a method would add value for us. Indications for creation of a new method are:
* The need for the implementation is very common.
* The implementation is complicated and/or bug-prone.
* The name very clearly implies the implementation.

Indications against the creation of a new method include:
* Concerns are mixed, such that it would be better to offer two (or more) methods.
* Nobody knows of a real-world use case for the method.

## Repository structure
```
generate/                Anything pertaining to code generation
├─ generator/               Code generator code (which should become its own package)
├─ generators/              Code which describes how/when/where to generated each type of file
└─ async.macro.js           You'll see this imported in most $ files. Read its docs!!

generate-yo/			 The yeoman generation code and templates. Used by the create:method script.

src/
├- internal/             Shared code which applies to many methods
├─ methods/              One folder per method. $some-method means "someMethod and asyncSomeMethod"
│  └─ $my-method/
│      ├─ __tests__         Jest tests. *.test.js is copied to *.spec.ts and type checked.
│      │  └─ $my-method.test.js
│      ├─ $my-method.js     The method implementation. Default export is exported from library
│      ├─ $my-method.d.ts   The method types. Default export is exported from library
│      └─ README.md         Method documentation. Will be intergrated into API.md and website
├- index.d.ts            Typedefs for index
└─ index.mjs             Main entry point
```

I've omitted the generated files (aside from the indexes) from the above tree, simply because you shouldn't need to modify them. All generated files begin with a leading comment that tell you which file you need to edit in order to alter its contents. If there is no such leading comment, the file is safe to change.

## Code formatting
The code in this project is autoformatted with Prettier. To format your code, run the command:
```
> npm run format
```
or better yet, configure prettier format-on-save for your editor.

If your text editor has an [editorconfig](http://EditorConfig.org) plugin, your indentation and line settings should already be correct.

## Making a PR
We are happy to review and merge PRs. To be accepted a change must have test coverage. If it is an API change, it must also have:
* Updated documentation
* An entry in the CHANGELOG
* A correct typescript definition

Please ask in the PR if you need any help.

## Prerelease checks
If you want to publish on npm and you have the credentials, you need to:
* Update the **changelog** with the date and number of the release
* Update the **code coverage** ```npm run coverage```

## Publish a prerelease
You need to bump the version:
```
npm version prerelease --preid=next
```
Then push:
```
git push
git push --tags
```
and then publish:
```
npm publish --tag next
```

## Publish a new release
You need to bump the version according to [SEMVER](https://semver.org/):
```
npm version [major | minor | patch]
```
Then push:
```
git push
git push --tags
```
and then publish:
```
npm publish
```
