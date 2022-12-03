
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
$ ng g schematics-x:file pages/profile/profile.component.ts

# Generate directory estimated by similar directory(`pages/user`)
$ ng g schematics-x:directory pages/profile

# Generate file or directory by auto(detect name extension)
$ ng g schematics-x:auto pages

# Generate by custom instructions and input files or directory
$ ng g schematics-x:instructions 'Create `pages/profile/index.ts` similar to inputs:' --inputs pages/user/index.ts,pages/community/index.ts
```

## LICENSE
MIT
