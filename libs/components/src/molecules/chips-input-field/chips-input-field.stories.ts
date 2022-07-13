import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ChipsInputFieldMolecule, ChipsInputFieldModule } from '.';
import { buildActions } from '@ng-atomic/storybook';
import { FormControl } from '@ngneat/reactive-forms';

export default {
  title: 'Molecules/ChipsInputField',
  component: ChipsInputFieldMolecule,
} as Meta;


const Template: Story = (args) => ({
  props: {...args, ...buildActions(['actionItemClick'])},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      ChipsInputFieldModule,
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
  ],
  control: new FormControl(''),
};
