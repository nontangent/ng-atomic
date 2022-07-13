import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TextareaFieldMolecule, TextareaFieldModule } from '.';

export default {
  title: 'Molecules/TextareaField',
  component: TextareaFieldMolecule,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      TextareaFieldModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
