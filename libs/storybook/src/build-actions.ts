import { action } from '@storybook/addon-actions';

export const buildActions = (names: string[]) => names.reduce((p, name) => ({
  ...p, [name]: action(name),
}), {});
