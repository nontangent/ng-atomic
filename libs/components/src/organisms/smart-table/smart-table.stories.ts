import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartTableOrganism, SmartTableModule } from '.';

export default {
  title: 'Organisms/SmartTable',
  component: SmartTableOrganism,
  argTypes: {
    sortOrder: {
      control: { type: 'select', options: ['asc', 'desc', undefined] },
    }
  }
} as Meta;

const ACTIONS = {
  pageChange: action('pageChange'),
  headerClick: action('headerClick'),
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
  columns: ['id', 'name', 'description'],
  items: [
    { id: 11, name: 'Dr Nice', description: '', realName: 'Alex' },
    { id: 12, name: 'Narco', description: '', realName: 'Alex' },
    { id: 13, name: 'Bombasto', description: '', realName: 'Alex' },
    { id: 14, name: 'Celeritas', description: '', realName: 'Alex' },
    { id: 15, name: 'Magneta', description: '', realName: 'Alex' },
    { id: 16, name: 'RubberMan', description: '', realName: 'Alex' },
    { id: 17, name: 'Dynama', description: '', realName: 'Alex' },
    { id: 18, name: 'Dr IQ', description: '', realName: 'Alex' },
    { id: 19, name: 'Magma', description: '', realName: 'Alex' },
    { id: 20, name: 'Tornado', description: '', realName: 'Alex' }
  ],
  sortKey: 'id',
  sortOrder: 'asc',
};
