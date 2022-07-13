import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { DrawerFrame, DrawerModule } from '.';
import { buildActions } from '@ng-atomic/storybook';

export default {
  title: 'Frames/Drawer',
  component: DrawerFrame,
} as Meta;


const Template: Story = (args) => ({
  props: {...args, ...buildActions([])},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      DrawerModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {};
