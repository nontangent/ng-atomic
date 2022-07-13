import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TextareaSectionOrganism, TextareaSectionModule } from '.';

export default {
  title: 'Organisms/TextareaSection',
  component: TextareaSectionOrganism,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      TextareaSectionModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
