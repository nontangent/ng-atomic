# Schematics X

A generic code generator using [Schematics](https://www.npmjs.com/package/@angular-devkit/schematics) and GPT-3.

![demo_gif](https://github.com/nontangent/ng-atomic/blob/main/libs/schematics-x/demo.gif?raw=true)


## Preparation

Get Open AI API Access Token via https://beta.openai.com/account/api-keys

```sh
$ export OPEN_AI_TOKEN=<--OPEN_AI_ACCESS_TOKEN-->
```

## Try Schematics X

```sh
$ npx schematics-x auto index.html
```

## Setup for Global(React, Vue, other Languages)

```sh
$ npm i -g schematics-x
```

## Setup for Angular or Nx Workspace

```sh
ng add schematics-x
```

## Usage

```sh
# Generate file estimated by similar files(`pages/user/user.component.ts`)
$ sx file pages/profile/profile.module.ts

# Generate directory estimated by similar directory(`pages/profile`)
$ sx directory pages/user

# Generate file or directory by auto(detect name extension)
$ sx auto pages/group

# Generate by custom instructions and input files or directory
# Ex1: Add CRUD method to profile.service
$ sx instruct -t pages/profile/profile.service.ts
? *What do you instruct GPT-3?* Add create, get, update and delete method to above code:

# Ex2: Remove all method from profile.service
$ sx instruct -t pages/profile/profile.service.ts
? *What do you instruct GPT-3?* Remove all method from above code:
```


## Demo

[StackBlitz](https://stackblitz.com/edit/schematics-x-demo?file=README.md)

## LICENSE

MIT
