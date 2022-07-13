import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { overrideModule } from '@ng-atomic/common/utils/override-module';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartCrudTemplate, SmartCrudModule } from '.';

export default {
  title: 'Templates/SmartCrud',
  component: SmartCrudTemplate,
  argTypes: {
    mode: {
      control: { type: "select", options: ["create", "update"] },
    },
  },
} as Meta;



const ACTIONS = {
  backButtonClick: action('backButtonClick'),
  createButtonClick: action('createButtonClick'),
  updateButtonClick: action('updateButtonClick'),
};

const Template: Story = (args) => ({
  props: {
    ...args,
    form: new FormGroup({
      id: new FormControl(1),
    }),
    ...ACTIONS,
  },
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      SmartCrudModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {
  canBack: false,
  name: 'Hero',
  mode: 'create',
};
