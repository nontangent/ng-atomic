import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AtomicPageFrameLineUpFrame } from './line-up.frame';

describe('AtomicPageFrameLineUpFrame', () => {
  let component: AtomicPageFrameLineUpFrame;
  let fixture: ComponentFixture<AtomicPageFrameLineUpFrame>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtomicPageFrameLineUpFrame ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomicPageFrameLineUpFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
