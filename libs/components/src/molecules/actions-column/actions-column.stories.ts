import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { buildActions } from '@ng-atomic/storybook';
import { Meta, Story } from '@storybook/angular';
import { ActionsColumnMolecule, ActionsColumnModule } from '.';

export default {
  title: 'Molecules/ActionsColumn',
  component: ActionsColumnMolecule,
} as Meta;


const Template: Story = (args) => ({
  props: {...args, ...buildActions(['actionItemClick'])},
  template: `
  <table mat-table [dataSource]="items" matSort matSortDisableClear matSortDirection="desc">
    <molecules-actions-column
      *ngFor="let name of displayedColumns" 
      [name]="name"
      [actionItems]="actionItems"
    ></molecules-actions-column>
    <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
    <tr mat-row *matRowDef="let item; columns: displayedColumns;"></tr>
  </table>`,
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      ActionsColumnModule,
      MatTableModule,
    ]
  }
});

enum ActionId {
  TEST1,
  TEST2,
}

export const Default = Template.bind({});
Default.args = {
  items: [{id: '01'}, {id: '02'}, {id: '03'}],
  displayedColumns: ['__actions'],
  actionItems: [
    {id: ActionId.TEST1, name: 'TEST 1'},
    {id: ActionId.TEST2, name: 'TEST 2'},
  ]
};
