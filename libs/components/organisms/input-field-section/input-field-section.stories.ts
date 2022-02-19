import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { InputFieldSectionOrganism, InputFieldSectionModule } from '.';

export default {
  title: 'Organisms/InputFieldSection',
  component: InputFieldSectionOrganism,
} as Meta;

const ACTIONS = {
  backButtonClick: action('backButtonClick'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      InputFieldSectionModule,
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
  menuItems: [
    {id: ActionId.TEST1, name: 'TEST 1'},
    {id: ActionId.TEST2, name: 'TEST 2'},
  ]
};
