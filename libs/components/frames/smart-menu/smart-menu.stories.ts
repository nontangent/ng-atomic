import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartMenuFrame, SmartMenuModule } from '.';

export default {
  title: 'FrameS/SmartMenu',
  component: SmartMenuFrame,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      SmartMenuModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
