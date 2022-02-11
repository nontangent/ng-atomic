import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'organisms-heading',
  templateUrl: './heading.organism.html',
  styleUrls: ['./heading.organism.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingOrganism {}
