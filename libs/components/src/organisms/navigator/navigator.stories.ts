import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { NavigatorOrganism, NavigatorModule } from '.';

export default {
  title: 'Organisms/Navigator',
  component: NavigatorOrganism,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      NavigatorModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
