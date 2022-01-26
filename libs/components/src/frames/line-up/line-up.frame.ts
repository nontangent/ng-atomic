import { animate, query, sequence, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Injectable, Input, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, tap } from 'rxjs/operators';
import { fromResize } from './resize-observer';

const visibleHiddenAnimation = trigger('visibleHidden', [
  state('visible', style({
    width: '100%',
  })),
  state('hidden', style({
    display: 'none',
    width: '0%',
  })),
  transition('visible => hidden', [
    animate('0.5s', style({ width: '0%' })),
    style({display: 'none'}),
  ]),
  transition('hidden => visible', [
    sequence([
      style({ display: 'inherit' }),
      animate('0.5s', style({ width: '100%' })),
    ]),
  ]),
]);

const routeAnimation = trigger('pageChange', [
  state('Next', style({
    position: 'relative',
    width: '100%',
  })),
  state('Blank', style({
    position: 'relative',
    display: 'none',
  })),
  transition('Blank => Next', [
    query(':enter', [animate('0.5s')], { optional: true }),
    sequence([
      style({ display: 'inherit', width: '100%' }),
      animate('0.5s'),
    ]),
  ]),
  transition('Next => Blank', [
    query(':leave', 
    [
      animate('0.5s', style({width: '100%'})),
    ], { optional: true }),
    sequence([
      style({position: 'absolute', left: '100%', display: 'block'}),
      animate('0.5s', style({position: 'absolute', left: '200%', display: 'block'})),
      style({display: 'block'}),
    ])
  ])
]);

const routeAnimation2 = trigger('expand', [
  state('Next', style({
    width: '100%',
  })),
  state('Blank', style({
    width: '100%',
  })),
  transition('B => N', [
    // style({width: '0%'}),
    // animate('0.5s', style({width: '100%'})),
  ]),
  transition('N => B', [
    // style({width: '0%'}),
    // animate('0.5s', style({width: '100%'})),
  ])
]);

@Injectable({providedIn: 'root'})
class LineUpService {
  pageAnimationDone$ = new ReplaySubject(1);
}

@Component({
  selector: 'frames-line-up',
  templateUrl: './line-up.frame.html',
  styleUrls: ['./line-up.frame.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    visibleHiddenAnimation,
    routeAnimation,
    routeAnimation2,
  ]
})
export class LineUpFrame {
  @HostBinding('attr.is-main-hidden')
  // @Input()
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

  @HostBinding('attr.page')
  private _page: string = 'Blank';
  get page(): string {
    const page = this.outlet?.activatedRouteData?.page;
    if (page === 'Blank') this.isMainHidden = false;
    return this._page === page ? this._page : page;
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
      console.debug(this.label, this.width, this.isMainHidden);
      this.cd.detectChanges();
    });

    console.debug('this.main:', this.main)
    // _fromResize(this.main).subscribe((width: number) => {
    //   console.debug('this.main:', this.main)
    //   console.debug('width:', width);
    //   this.el.nativeElement.style.width = `${width}px`;
    //   this.cd.detectChanges();
    // })

    // this.service.pageAnimationDone$.subscribe(() => {
    //   this.isMainHidden = this.width > 361;
    //   console.debug('===animation end===');
    //   console.debug(this.label, this.isMainHidden);
    // });
  }
}
