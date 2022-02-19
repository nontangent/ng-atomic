import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Meta, Story } from '@storybook/angular';
import { SmartCrudTemplate, SmartCrudModule } from '.';

export default {
  title: 'Templates/SmartCrud',
  component: SmartCrudTemplate,
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
    form: new FormGroup({
      id: new FormControl(1),
    }),
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
