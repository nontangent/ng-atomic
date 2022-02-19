import { Meta, Story } from '@storybook/angular';
import { HeadingModule, HeadingOrganism } from '.';

export default {
  title: 'Organisms/Heading',
  component: HeadingOrganism,
} as Meta;


const Template: Story = (args) => ({
  template: `<organisms-heading [level]="level"><span>TEST2</span></organisms-heading>`,
  props: {...args},
  moduleMetadata: {
    imports: [HeadingModule]
  }
});

export const Default = Template.bind({});
Default.args = {
  level: '1',
};