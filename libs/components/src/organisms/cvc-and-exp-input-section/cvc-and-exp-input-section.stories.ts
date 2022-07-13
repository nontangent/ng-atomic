import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CvcAndExpInputSectionOrganism, CvcAndExpInputSectionModule } from '.';

export default {
  title: 'Organisms/CvcAndExpInputSection',
  component: CvcAndExpInputSectionOrganism,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CvcAndExpInputSectionModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
