# How to contribute

We hope you are finding iter-tools useful and are glad you would like to contribute. Thank you!
Working on an open source project like this should be a rewarding and instructive experience. To keep it that way we do enforce a [code of conduct](CODE_OF_CONDUCT.md), so be sure to read and follow it.

Most of the contributors are working at this project in their free time. So the first rule is to not expect someone to answer you immediately, just like no one expects you to do the same. We love open sources but everyone has more important commitments (job, family, etc).

To contribute you will need at least node version 8. We do test our code against language functionality (async generators) that exists only in node 10+, but our CI environment will handle that for you.

## Templates
In the `src/` directory you'll notice that each method has quite a few files associated with it in the project's file tree. For a typical method (named method) you'll see something that looks like this annotated example:
```
__tests__/$method.test.js       # Method test template
__tests__/async-method.spec.ts  # [generated] Async method type test
__tests__/async-method.test.js  # [generated] Async method test
__tests__/method.spec.ts        # [generated] Sync method type test
__tests__/method.test.js        # [generated] Sync method test
$method.d.ts       # Typescript definitions template
$method.js         # Implementation template
async-method.d.ts  # [generated] Async Typescript definitions
async-method.mjs   # [generated] Async implementation
method.d.ts        # [generated] Sync Typescript definitions
method.mjs         # [generated] Sync implementation
```

When you see something like the above, you are looking at a method which is being generated from templates. The templates are the files with names beginning with `$`, and when they are present for a method, they are the only files you should edit.

To cause your changes to the templates to propogate to the generated files, you can run either:
```
> npm run generate # to build once, OR
> npm run generate:watch # to continuously update generated files OR
> npm run generate:watch -- --watchman # for more efficient (and file-handle-efficient) watching if you have watchman installed
```
Note that you must do this prior to checking in code or your Travis build will fail. This is because we check the generated files in so that it is always possible to see the actual javascript implementations of the methods at any point in the repository's history.

Code associated with the creation of the generated files from the templates lives entirely in the `generate/` folder.

The goal of the template system is to ease the difficulty of maintaining highly similar sync and async versions of the functions. It is not possible to combine these functions into a single runtime implementation because we use generators to manage iterator internals, and yield expressions for a generator cannot be delegated away to any other function.

Inside the templates you'll notice a lot of `$` characters. When you see `$` expect the symbol to disappear in sync methods and to become `async` in async methods. As much of this as possible is handled by `generate/async.macro`, which also contains useful documentation of its transformations. The macro is not nuntime code, but rather instructions to babel, which are applied by the `generate` script. In many places though it is not possible to transform `$` with a macro. This most prominently includes import statements and function names. These appearances of `$` are still detected and transformed by babel accorting to the rules above.

## Code formatting
The code in this project is autoformatted with Prettier. To format your code, run the command:
```
> npm run format
```
or better yet, configure a prettier format-on-save for your editor.

If your text editor has an [editorconfig](http://EditorConfig.org) plugin, your indentation and line settings should already be correct.

## Issues
The easiest way to contribute is to create an [issue](https://github.com/sithmel/iter-tools/issues). That can be a bug report, a proposal or a general enquire.
If you want to contribute but you don't know where to start, try contacting the author or one of the contributors.

## PRs
We are happy to review and merge PRs. To be accepted a change must:
* have a test coverage
* have an entry in the changelog
* be documented in the README
* have a correct typescript definition

Ask in the PR if you need any help.

## New features
New features can be proposed but take into consideration that any addition needs to be discussed and can be rejected. Unuseful features are an unneccessary maintenance burder and removing them requires going through a deprecation process. Better safe than sorry!
Here's a simple criteria to tell if an addition is worth it:
```
Whenever we make a new name for something, it has to be worth it for most people to learn the name instead of just using (more or less) the implementation inline. To meet that criteria one of the following must be the case:

* The need for the implementation is very common.
* The implementation is complicated and/or bug-prone.
* The name is so good that people can understand the implementation without additional help.
```

## Prerelease checks
If you want to publish on npm and you have the credentials, you need to:
* update the **changelog** and the **readme**
* update the **code coverage** ```npm run coverage```

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
