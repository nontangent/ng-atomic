import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'organisms-paginator',
  templateUrl: './paginator.organism.html',
  styleUrls: ['./paginator.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {class: 'organism'},
})
export class PaginatorOrganism {

  @Input()
  control = new FormControl<string>('');

  @Input()
  placeholder = '';

  @Input()
  page!: PageEvent;

  @Input()
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @Output()
  pageChange = new EventEmitter<PageEvent>();

}
