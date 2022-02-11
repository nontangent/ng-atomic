import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLayoutFrame } from './auto-layout.frame';

describe('AutoLayoutFrame', () => {
  let component: AutoLayoutFrame;
  let fixture: ComponentFixture<AutoLayoutFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoLayoutFrame ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoLayoutFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
