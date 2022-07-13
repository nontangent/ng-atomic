import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { DateInputFieldMolecule, DateInputFieldModule } from '.';

export default {
  title: 'MoleculeS/DateInputField',
  component: DateInputFieldMolecule,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      DateInputFieldModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
