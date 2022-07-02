import { Meta, Story } from '@storybook/angular';
import { ChipsInputAtom, ChipsInputModule } from '.';

export default {
  title: 'Atoms/ChipsInput',
  template: ChipsInputAtom,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      ChipsInputModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
