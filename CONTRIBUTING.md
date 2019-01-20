# How to contribute

If you are here you might find iter-tools useful and you would like to contribute. Thank you!
Working on an open source project like this should be a rewarding and instructive experience. I hope you will find it a pleasant experience.

I understand that most of the contributors are working at this project in their free time. So the first rule is to not expect someone to answer you immediately, just like no one expects you to do the same. We love open sources but everyone has more important commitments (job family etc.)

## Coding conventions
This project uses ESLINT with [standard](https://standardjs.com/). Just run ```npm run lint``` to check if your code is ok. Also we use 2 spaces for indentation.

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
New features can be proposed but take into consideration that can be discussed for a while or rejected. Unuseful features are an unneccessary maintenance burder and removing them requires going through a deprecation process. Better safe than sorry!
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
