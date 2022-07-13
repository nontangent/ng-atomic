import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'frames-smart-menu',
  templateUrl: './smart-menu.frame.html',
  styleUrls: ['./smart-menu.frame.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartMenuFrame {
  @HostBinding('attr.is-main-hidden')
  isMainHidden = false;

  @Input()
  label = 'root';

  @Input()
  outlet?: RouterOutlet;

  @Input()
  minNextWidth: number = 360;

  @ViewChild('next', {static: true})
  next!: ElementRef;

  get page(): string {
    const page: string = this.outlet?.activatedRouteData?.['page'];
    return page === 'Blank' ? 'Blank' : this.isMainHidden ? `Next` : `NextWithMainPage`;
  }

}
