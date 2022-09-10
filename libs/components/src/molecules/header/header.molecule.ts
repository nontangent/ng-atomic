import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'molecules-header',
  templateUrl: './header.molecule.html',
  styleUrls: ['./header.molecule.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMolecule {

  @Input()
  title = 'title';

  @Input()
  description?: string;

}
