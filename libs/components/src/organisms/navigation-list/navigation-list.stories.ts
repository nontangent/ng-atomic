import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { NavigationListOrganism, NavigationListModule } from '.';
import { buildActions } from '@ng-atomic/storybook';

export default {
  title: 'Organisms/NavigationList',
  component: NavigationListOrganism,
} as Meta;

const Template: Story = (args) => ({
  props: {...args, ...buildActions(['action'])},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      NavigationListModule,
    ]
  }
});

enum ActionId {
  MENU_1 = '1',
  MENU_2 = '2',
}

export const Default = Template.bind({});
Default.args = {
  items: [
    {id: ActionId.MENU_1, name: 'Menu 1', icon: 'add'},
    {id: ActionId.MENU_2, name: 'Menu 2', icon: 'remove'},
  ]
};
