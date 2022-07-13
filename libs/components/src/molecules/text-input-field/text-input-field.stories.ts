import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TextInputFieldMolecule, TextInputFieldModule } from '.';

export default {
  title: 'Molecules/TextInputField',
  component: TextInputFieldMolecule,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      TextInputFieldModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
