import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Injectable, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LINE_UP_ANIMATIONS } from './line-up.animations';
import { fromResize } from './resize-observer';

const _fromResize = (el: ElementRef) => fromResize(el.nativeElement)
  .pipe(map(({contentRect}: {contentRect: {width: number}}) => contentRect?.width ?? 0))
  .pipe(distinctUntilChanged());

@Injectable({providedIn: 'root'})
class LineUpService {
  pageAnimationDone$ = new ReplaySubject(1);
}

@Component({
  selector: 'frames-line-up',
  templateUrl: './line-up.frame.html',
  styleUrls: ['./line-up.frame.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: LINE_UP_ANIMATIONS,
})
export class LineUpFrame {
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

  constructor(
    public service: LineUpService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    if (this.label === 'root') return; 

    _fromResize(this.next).subscribe((width: number) => {
      this.isMainHidden = width > this.minNextWidth;
      this.cd.detectChanges();
    });
  }
}
