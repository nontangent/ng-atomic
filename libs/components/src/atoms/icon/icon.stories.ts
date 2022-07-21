import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { IconAtom, IconModule } from '.';

export default {
  title: 'Atoms/Icon',
  component: IconAtom,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  template: `<atoms-icon [name]="name" [color]="color"></atoms-icon>`,
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      IconModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {
  name: 'add',
  color: 'red',
};
