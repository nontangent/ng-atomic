import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TextInputSectionOrganism, TextInputSectionModule } from '.';

export default {
  title: 'Organisms/TextInputSection',
  component: TextInputSectionOrganism,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      TextInputSectionModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
