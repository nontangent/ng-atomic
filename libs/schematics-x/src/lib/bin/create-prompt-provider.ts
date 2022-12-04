/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import 'symbol-observable';
import { schema } from '@angular-devkit/core';
import * as inquirer from 'inquirer';

export function _createPromptProvider(): schema.PromptProvider {
  return (definitions) => {
    const questions: inquirer.QuestionCollection = definitions.map((definition) => {
      const question: inquirer.Question = {
        name: definition.id,
        message: definition.message,
        default: definition.default,
      };

      const validator = definition.validator;
      if (validator) {
        question.validate = (input) => validator(input);
      }

      switch (definition.type) {
        case 'confirmation':
          return { ...question, type: 'confirm' };
        case 'list':
          return {
            ...question,
            type: definition.multiselect ? 'checkbox' : 'list',
            choices:
              definition.items &&
              definition.items.map((item) => {
                if (typeof item == 'string') {
                  return item;
                } else {
                  return {
                    name: item.label,
                    value: item.value,
                  };
                }
              }),
          };
        default:
          return { ...question, type: definition.type };
      }
    });

    return inquirer.prompt(questions);
  };
}
