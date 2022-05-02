import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartMenuButtonAtom, SmartMenuButtonModule } from '.';

export default {
  title: 'AtomS/SmartMenuButton',
  component: SmartMenuButtonAtom,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      SmartMenuButtonModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
