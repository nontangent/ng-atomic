import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMenuButtonAtom } from './smart-menu-button.atom';

describe('SmartMenuButtonAtom', () => {
  let component: SmartMenuButtonAtom;
  let fixture: ComponentFixture<SmartMenuButtonAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartMenuButtonAtom ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartMenuButtonAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
