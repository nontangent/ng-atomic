import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'atoms-example',
  templateUrl: './example.atom.html',
  styleUrls: ['./example.atom.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAtom implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
