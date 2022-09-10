import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { HeaderMolecule, HeaderModule } from '.';

export default {
  title: 'Molecules/Header',
  component: HeaderMolecule,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      HeaderModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
