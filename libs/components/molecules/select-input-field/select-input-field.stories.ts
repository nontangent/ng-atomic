import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SelectInputFieldMolecule, SelectInputFieldModule } from '.';

export default {
  title: 'Molecules/SelectInputField',
  component: SelectInputFieldMolecule,
} as Meta;

const ACTIONS = {
  actionItemClick: action('actionItemClick'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      SelectInputFieldModule,
    ]
  }
});

enum ActionId {
  TEST1,
  TEST2,
}

export const Default = Template.bind({});
Default.args = {
  title: 'Navigator Title',
  actionItems: [
    {id: ActionId.TEST1, name: 'TEST 1'},
    {id: ActionId.TEST2, name: 'TEST 2'},
  ]
};
