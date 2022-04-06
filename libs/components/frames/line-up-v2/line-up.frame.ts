import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LINE_UP_ANIMATIONS } from './line-up.animations';
import { fromResize } from './resize-observer';

enum Mode {
  MAIN = 'Main',
  BOTH = 'Both',
  NEXT = 'Next',
}

@Component({
  selector: 'frames-line-up',
  templateUrl: './line-up.frame.html',
  styleUrls: ['./line-up.frame.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: LINE_UP_ANIMATIONS,
})
export class LineUpFrame implements OnInit, OnDestroy {
  Mode = Mode;
  mode = Mode.MAIN;

  private readonly destroy$ = new ReplaySubject(1);

  @Input()
  label = 'root';

  private _hasNext$ = new BehaviorSubject(false);  

  @Input()
  set hasNext(value: boolean) {
    this._hasNext$.next(value);
  };

  @Input()
  minNextWidth: number = 360;

  @ViewChild('next', {static: true})
  nextElementRef!: ElementRef;

  ngOnInit(): void {
    combineLatest([this._hasNext$, fromResize(this.nextElementRef)])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([hasNext, width]) => {
        this.mode = this.resolveMode(hasNext, width);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
  }

  private resolveMode(hasNext: boolean, width: number): Mode {
    if (hasNext && width <= this.minNextWidth) return Mode.BOTH;
    return hasNext ? Mode.NEXT : Mode.MAIN;
  }
}
