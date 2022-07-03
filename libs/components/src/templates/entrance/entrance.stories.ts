import { Meta, Story } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntranceTemplate, EntranceModule } from '.';

export default {
  title: 'Templates/Entrance',
  component: EntranceTemplate,
} as Meta;


export const Default: Story = () => ({
  props: {},
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      EntranceModule,
    ]
  }
});
