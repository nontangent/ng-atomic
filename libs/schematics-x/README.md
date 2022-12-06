# Schematics X

A generic code generator using [Schematics](https://www.npmjs.com/package/@angular-devkit/schematics) and GPT-3.

![demo](https://user-images.githubusercontent.com/19902731/205523090-5373c897-90a6-4f38-881a-46208bc855ce.gif)


## Try Schematics X

```sh
# Setting OpenAI Access Token
$ export OPEN_AI_TOKEN=<--OPEN_AI_ACCESS_TOKEN-->
$ npx schematics-x auto index.html
```

## Setup(Angular or Nx Workspace)

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


## Demo

[StackBlitz](https://stackblitz.com/edit/angular-webcontainer-template-v1mpus?file=README.md)

## LICENSE

MIT


## Usecase

```sh
$ npx schematics instruct --scope=./libs/common/**/*.component.ts 
Create file `libs/common/components/example.component.ts`
```

```sh
$ npx schematics instruct --scope=./libs/common/components
Create directory `libs/common/components/example`
```

AngularJSONを変種したい。
```sh
$ npx schematics instruct --scope=./libs/common/components --inputs=./ --outputs=./angular.json
What do you instruct GPT-3? Create file `angular.json`
```
