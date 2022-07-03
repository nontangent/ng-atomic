import { Meta, Story } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlankPage, BlankModule } from '.';

export default {
  title: 'Pages/Blank',
  component: BlankPage,
} as Meta;


export const Default: Story = () => ({
  props: {},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      BlankModule,
    ]
  }
});
