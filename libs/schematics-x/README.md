# Schematics X

A schematics based on GPT-3.

## Setup

```sh
# Setting OpenAI Access Token
$ export OPEN_AI_TOKEN=<--OPEN_AI_ACCESS_TOKEN-->
$ npm i -D schematics-x
```

## Usage

```sh
# Generate file estimated by similar files(`pages/user/user.component.ts`)
$ ng g schematics-x:file pages/profile/profile.module.ts

# Generate directory estimated by similar directory(`pages/profile`)
$ ng g schematics-x:directory pages/user

# Generate file or directory by auto(detect name extension)
$ ng g schematics-x:auto pages/group

# Generate by custom instructions and input files or directory
# Ex1: Add CRUD method to profile.service
$ ng g schematics-x:instruct --overwrite --inputs=pages/profile/profile.service.ts 'Add create, get, update and delete method to above code:'

# Ex2: Remove all method from profile.service
$ ng g schematics-x:instruct --overwrite --inputs=pages/profile/profile.service.ts 'Remove all method from above code:'
```

## Playground

[StackBlitz](https://stackblitz.com/edit/angular-webcontainer-template-v1mpus?file=README.md)

## LICENSE

MIT
