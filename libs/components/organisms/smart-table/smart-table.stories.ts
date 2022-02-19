import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartTableOrganism, SmartTableModule } from '.';

export default {
  title: 'Organisms/SmartTable',
  component: SmartTableOrganism,
} as Meta;

const ACTIONS = {
  pageChange: action('pageChange'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      SmartTableModule,
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
  ],
  page: {
    pageIndex: 1,
    previousPageIndex: 0,
    pageSize: 20,
    length: 100,
  },
};
