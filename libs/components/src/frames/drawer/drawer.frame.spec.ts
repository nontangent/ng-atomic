import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerFrame } from './drawer.frame';

describe('DrawerFrame', () => {
  let component: DrawerFrame;
  let fixture: ComponentFixture<DrawerFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerFrame ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
