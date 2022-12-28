import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartListOrganism, SmartListModule } from '.';

export default {
  title: 'Organisms/SmartList',
  component: SmartListOrganism,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      SmartListModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
