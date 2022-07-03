import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { DrawerFrame, DrawerModule } from '.';

export default {
  title: 'FrameS/Drawer',
  component: DrawerFrame,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      DrawerModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
