import { CdkCellDef, CdkColumnDef, CdkHeaderCellDef, CdkTable, TextColumnOptions, TEXT_COLUMN_OPTIONS } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Action, ActionItem } from '@ng-atomic/common/models';

@Component({
  selector: 'molecules-actions-column',
  templateUrl: './actions-column.molecule.html',
  styleUrls: ['./actions-column.molecule.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ActionsColumnMolecule<T> {
  @Input()
  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
    this._syncColumnDefName();
  }
  _name!: string;

  @Input()
  itemActions: (item: T) => ActionItem[] = () => [];

  @Output()
  action = new EventEmitter<Action>();

  @ViewChild(CdkColumnDef, {static: true})
  columnDef!: CdkColumnDef;
  
  @ViewChild(CdkCellDef, {static: true})
  cell!: CdkCellDef;

  @ViewChild(CdkHeaderCellDef, {static: true})
  headerCell!: CdkHeaderCellDef;

  constructor(
    @Optional() private _table: CdkTable<T>,
    @Optional() @Inject(TEXT_COLUMN_OPTIONS) private _options: TextColumnOptions<T>,
  ) {
    this._options ??= {};
  }

  ngOnInit() {
    this._syncColumnDefName();

    if (this._table) {
      this.columnDef.cell = this.cell;
      this.columnDef.headerCell = this.headerCell;
      this._table.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy() {
    if (this._table) {
      this._table.removeColumnDef(this.columnDef);
    }
  }

  private _syncColumnDefName() {
    if (this.columnDef) {
      this.columnDef.name = this.name;
    }
  }
}
