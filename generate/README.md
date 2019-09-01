## The generator
The purpose of the code generator is to cut down on the amount of boilerplate writing and copy-paste coding you need to do. Supporting parity for both sync and async generators requires a lot of duplicated code, because sync and async generators have differences at the syntax level which cannot be abstracted at runtime.

We've opted to mix generated and non-generated sources in the same tree because it's easier to understand (and generate) the correct import structure when you don't change the path to a file as your transpile it. We've also opted to check our generated files into git, because we want it to be clear what the plain javascript source code was at any given time in the repo's history.

Given these unique requirements, no existing code generator seemed suited to our needs, which is why we build this one. The intention is to extract a separate package for it eventually.
