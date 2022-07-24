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
  props: {...args, ...buildActions(['action'])},
  template: `
  <table mat-table [dataSource]="items" matSort matSortDisableClear matSortDirection="desc">
    <molecules-actions-column
      *ngFor="let name of displayedColumns" 
      [name]="name"
      [items]="items"
      (action)="action($event)"
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
  TEST1 = 'test 1',
  TEST2 = 'test 2',
}

export const Default = Template.bind({});
Default.args = {
  displayedColumns: ['__actions'],
  items: [
    {id: ActionId.TEST1, name: 'TEST 1'},
    {id: ActionId.TEST2, name: 'TEST 2'},
  ]
};
