import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartIndexTemplate, SmartIndexModule } from '.';
import { buildActions } from '@ng-atomic/storybook';
import { FormControl } from '@ngneat/reactive-forms';

export default {
  title: 'Templates/SmartIndex',
  component: SmartIndexTemplate,
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
    ...buildActions([
      'action',
      'backButtonClick',
      'checkboxClick',
      'pageChange',
      'tableHeaderClick',
    ]),
  },
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      SmartIndexModule,
    ]
  }
});

enum ActionId {
  CREATE = 'create',
  EDIT = 'Edit',
  CALL = 'Call',
}

export const Default = Template.bind({});
Default.args = {
  canBack: false,
  title: 'Angular Heros',    
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
  menuItems: [
    { id: ActionId.CALL, name: 'Call' },
    { id: ActionId.EDIT, name: 'Edit' },
  ],
  globalMenuItems: [
    { id: ActionId.CREATE, name: 'Create' },
  ],
  selectedIdSet: new Set<string>([11 as never as string]),
  sortKey: 'id',
  sortOrder: 'asc',
  properties: ['__checkbox', 'id', 'name', 'description', '__actions'],
  page: {
    pageIndex: 0,
    pageSize: 20,
    length: 100,
  },
  queryControl: new FormControl(''),
  queryPlaceholder: 'Please input search query',
};

