import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { MenuOrganism, MenuModule } from '.';

export default {
  title: 'Organisms/Menu',
  component: MenuOrganism,
} as Meta;

const ACTIONS = {
  actionItemClick: action('actionItemClick'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      MenuModule,
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
    {id: ActionId.MENU_1, name: 'Menu 1'},
    {id: ActionId.MENU_2, name: 'Menu 2'},
  ]
};
