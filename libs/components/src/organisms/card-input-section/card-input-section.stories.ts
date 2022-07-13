import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CardInputSectionOrganism, CardInputSectionModule } from '.';

export default {
  title: 'Organisms/CardInputSection',
  component: CardInputSectionOrganism,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CardInputSectionModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
