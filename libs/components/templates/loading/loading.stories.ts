import { Meta, Story } from '@storybook/angular';
import { LoadingTemplate, LoadingModule } from '.';

export default {
  title: 'Templates/Loading',
  component: LoadingTemplate,
} as Meta;


export const Default: Story = () => ({
  template: `<templates-loading></templates-loading>`,
  props: {},
  moduleMetadata: {
    imports: [LoadingModule]
  }
});
