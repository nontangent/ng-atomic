import { Meta, Story } from '@storybook/angular';
import { HeadingModule, HeadingOrganism } from '.';

export default {
  title: 'Organisms/Heading',
  component: HeadingOrganism,
  argTypes: {
    level: {
      control: { type: "select", options: [1, 2, 3, 4, 5, 6] },
    },
  },
} as Meta;


const Template: Story = (args) => ({
  template: `<organisms-heading [level]="level">TEST</organisms-heading>`,
  props: {...args},
  moduleMetadata: {
    imports: [HeadingModule]
  }
});

export const Default = Template.bind({});
Default.args = {
  level: 1,
};