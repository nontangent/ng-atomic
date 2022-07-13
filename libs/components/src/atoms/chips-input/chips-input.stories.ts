import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { buildActions } from '@ng-atomic/storybook';
import { Meta, Story } from '@storybook/angular';
import { ChipsInputAtom, ChipsInputModule } from '.';

export default {
  title: 'Atoms/ChipsInput',
  component: ChipsInputAtom,
} as Meta;

const Template: Story = (args) => ({
  props: {...args, ...buildActions([])},
  moduleMetadata: {
    imports: [
      ChipsInputModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
