import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { buildActions } from '@ng-atomic/storybook';
import { Meta, Story } from '@storybook/angular';
import { CheckboxColumnMolecule, CheckboxColumnModule } from '.';

export default {
  title: 'Molecules/CheckboxColumn',
  component: CheckboxColumnMolecule,
} as Meta;

const Template: Story = (args) => ({
  props: {...args, ...buildActions(['onCheckboxClick'])},
  template: `
    <table mat-table [dataSource]="items" matSort matSortDisableClear matSortDirection="desc">
      <molecules-checkbox-column
        *ngFor="let name of displayedColumns" 
        [name]="name"
        [selectedIdSet]="selectedIdSet"
        (checkboxClick)="onCheckboxClick()"
      ></molecules-checkbox-column>
      <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
      <tr mat-row *matRowDef="let item; columns: displayedColumns;"></tr>
    </table>`,
  moduleMetadata: {
    imports: [
      BrowserAnimationsModule,
      CheckboxColumnModule,
      MatTableModule,
    ]
  }
});

export const Default = Template.bind({});
Default.args = {
  title: 'Navigator Title',
  displayedColumns: ['_checkbox'],
  items: [ {id: '01'}, {id: '02'} ],
  selectedIdSet: new Set(['01']),
};
