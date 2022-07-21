import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { NavigationListItemMolecule, NavigationListItemModule } from '.';

export default {
  title: 'Molecules/NavigationListItem',
  component: NavigationListItemMolecule,
} as Meta;

const ACTIONS = {
  // eventEmitterName: action('eventEmitterName'),
};


const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  moduleMetadata: {
    imports: [
      NavigationListItemModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
