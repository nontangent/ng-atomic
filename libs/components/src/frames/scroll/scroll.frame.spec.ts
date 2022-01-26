import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollFrame } from './scroll.frame';

describe('ScrollFrame', () => {
  let component: ScrollFrame;
  let fixture: ComponentFixture<ScrollFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollFrame ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
