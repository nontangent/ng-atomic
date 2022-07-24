import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { SmartMenuButtonAtom, SmartMenuButtonModule } from '.';
import { BrowserModule } from '@angular/platform-browser';
import { buildActions } from '@ng-atomic/storybook';

export default {
  title: 'AtomS/SmartMenuButton',
  component: SmartMenuButtonAtom,
} as Meta;

const Template: Story = (args) => ({
  props: {...args, ...buildActions(['action']) },
  moduleMetadata: {
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      SmartMenuButtonModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      id: 'test-action-01',
      name: 'テスト01',
    },
    {
      id: 'test-action-01',
      name: 'テスト01',
    },
  ]
};
