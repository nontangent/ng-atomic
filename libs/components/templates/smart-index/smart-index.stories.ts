import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SmartIndexTemplate, SmartIndexModule } from '.';

export default {
  title: 'Templates/SmartIndex',
  component: SmartIndexTemplate,
} as Meta;

const toActions = (names: string[]) => names.reduce((p, name) => ({
  ...p, [name]: action(name),
}), {});

const Actions = toActions([
  'actionItemClick',
  'backButtonClick',
  'checkboxClick',
  'pageChange',
]);

const Template: Story = (args) => ({
  props: { ...args, ...Actions },
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      SmartIndexModule
    ]
  }
});

enum ActionId {
  CREATE,
  EDIT,
  CALL,
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
  actionItems: [
    { id: ActionId.CALL, name: 'Call' },
    { id: ActionId.EDIT, name: 'Edit' },
  ],
  menuActionItems: [
    { id: ActionId.CREATE, name: 'Create' },
  ],
  selectedIdSet: new Set<string>([11 as never as string]),
  properties: ['__checkbox', 'id', 'name', 'description', '__actions'],
  page: {
    pageIndex: 0,
    pageSize: 20,
    length: 100,
  },
  queryControl: null,
  queryPlaceholder: 'Please input search query',
};

