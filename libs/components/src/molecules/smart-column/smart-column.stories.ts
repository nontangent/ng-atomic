import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { SmartColumnMolecule, SmartColumnModule } from '.';
import { MatTableModule } from '@angular/material/table';

export default {
  title: 'Molecules/SmartColumn',
  component: SmartColumnMolecule,
  argTypes: {
    sort: {
      control: { type: 'select', options: ['asc', 'desc', 'none'] },
    },
  },
} as Meta;

const ACTIONS = {
  actionItemClick: action('actionItemClick'),
  headerClick: action('headerClick'),
};


console.debug('headerClick:', ACTIONS.headerClick);

const Template: Story = (args) => ({
  props: {...args, ...ACTIONS},
  template: `
  <table mat-table [dataSource]="items" matSort matSortDisableClear matSortDirection="desc">
    <molecules-smart-column
      *ngFor="let name of displayedColumns" 
      [name]="name"
      [headerText]="name"
      [sort]="sort"
      (headerClick)="headerClick()"
    ></molecules-smart-column>
    <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
    <tr mat-row *matRowDef="let item; columns: displayedColumns;"></tr>
  </table>`,
  moduleMetadata: {
    imports: [
      CommonModule,
      BrowserAnimationsModule,
      MatTableModule,
      SmartColumnModule,
    ]
  }
});

enum ActionId {
  TEST1,
  TEST2,
}

export const Default = Template.bind({});
Default.args = {
  columns: ['id'],
  displayedColumns: ['id'],
  items: [{id: '01'}, {id: '02'}, {id: '03'}],
  sort: 'none',
};
