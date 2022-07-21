import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { NavigationListOrganism, NavigationListModule } from '.';

export default {
  title: 'Organisms/NavigationList',
  component: NavigationListOrganism,
} as Meta;

const ACTIONS = {
  actionItemClick: action('actionItemClick'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      NavigationListModule,
    ]
  }
});

enum ActionId {
  MENU_1,
  MENU_2,
}

export const Default = Template.bind({});
Default.args = {
  actionItems: [
    {id: ActionId.MENU_1, name: 'Menu 1', icon: 'add'},
    {id: ActionId.MENU_2, name: 'Menu 2', icon: 'remove'},
  ]
};
