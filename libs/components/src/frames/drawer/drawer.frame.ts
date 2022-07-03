import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'frames-drawer',
  templateUrl: './drawer.frame.html',
  styleUrls: ['./drawer.frame.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerFrame {

  @ViewChild(MatDrawer)
  drawer!: MatDrawer;

  private _isOpen = false;

  @Input()
  set isOpen(_isOpen: boolean) {
    _isOpen ? this.drawer?.open() : this.drawer?.close();
    this._isOpen = _isOpen
  }

  get isOpen(): boolean {
    return this._isOpen
  }

}
