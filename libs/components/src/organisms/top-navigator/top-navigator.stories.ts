import { Meta, Story } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavigatorOrganism, TopNavigatorModule } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Organisms/TopNavigator',
  component: TopNavigatorOrganism,
} as Meta;

const ACTIONS = {
  menuItemClick: action('menuItemClick'),
}

const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      TopNavigatorModule,
    ]
  }
});

enum ActionId {
  ACTION_1,
  ACTION_2,
}

export const Default = Template.bind({});
Default.args = {
  title: 'Navigator Title',
  menuItems: [
    {id: ActionId.ACTION_1, name: 'Action 1'},
    {id: ActionId.ACTION_2, name: 'Action 2'},
  ]
};
