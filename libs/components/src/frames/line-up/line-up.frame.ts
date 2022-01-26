import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Injectable, Input, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { LINE_UP_ANIMATIONS } from './line-up.animations';
import { fromResize } from './resize-observer';


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

  @Output()
  changeNextWidth = new EventEmitter<number>();

  @ViewChild('main', {static: true})
  main!: ElementRef;

  @ViewChild('next', {static: true})
  next!: ElementRef;

  get page(): string {
    const page: string = this.outlet?.activatedRouteData?.page;
    return page === 'Blank' ? 'Blank' : this.isMainHidden ? `Next` : `NextWithMainPage`;
  }

  constructor(
    public service: LineUpService,
    private el: ElementRef,
    private cd: ChangeDetectorRef,
  ) { }

  width = 0;

  ngOnInit(): void {
    if (this.label === 'root') return; 
    const _fromResize = (el: ElementRef) => fromResize(el.nativeElement).pipe(
      map(({contentRect}) => contentRect?.width ?? 0),
      distinctUntilChanged(),
    );

    _fromResize(this.next).subscribe(width => {
      this.width = width;
      this.isMainHidden = this.width > 360;
      this.cd.detectChanges();
    });
  }
}
