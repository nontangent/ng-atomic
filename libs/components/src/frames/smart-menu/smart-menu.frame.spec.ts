import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMenuFrame } from './smart-menu.frame';

describe('SmartMenuFrame', () => {
  let component: SmartMenuFrame;
  let fixture: ComponentFixture<SmartMenuFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartMenuFrame ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartMenuFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
