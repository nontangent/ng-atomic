import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayFrame } from './overlay.frame';

describe('OverlayFrame', () => {
  let component: OverlayFrame;
  let fixture: ComponentFixture<OverlayFrame>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayFrame ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
