import { EntranceTemplate, EntranceModule } from '.';
import { Meta, Story } from '@storybook/angular';
// import docs from './entrance.stories.mdx';

export default {
  title: 'Templates/Entrance',
  component: EntranceTemplate,
} as Meta;


export const Default: Story = () => ({
  template: `
    <templates-entrance style="height: 100%; padding: 40px 0">
    </templates-entrance>
  `,
  props: {},
  moduleMetadata: {
    imports: [EntranceModule]
  }
});
