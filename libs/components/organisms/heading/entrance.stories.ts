import { HeadingModule, HeadingOrganism } from '.';
import { Meta, Story } from '@storybook/angular';

export default {
  title: 'Organisms/Heading',
  component: HeadingOrganism,
} as Meta;


export const Default: Story = () => ({
  template: `<organisms-heading>TEST HEADING</organisms-heading>`,
  props: {},
  moduleMetadata: {
    imports: [HeadingModule]
  }
});

export const NEXT: Story = () => ({
  template: `<organisms-heading>TEST HEADING</organisms-heading>`,
  props: {},
  moduleMetadata: {
    imports: [HeadingModule]
  }
});

