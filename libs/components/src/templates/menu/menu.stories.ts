import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { MenuTemplate, MenuModule } from '.';

export default {
  title: 'Templates/Menu',
  component: MenuTemplate,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      MenuModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {
  items: [
    { id: '1', name: 'Item A', icon: 'add' },
    { id: '2', name: 'Item B', icon: 'add' },
  ]
};
