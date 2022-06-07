import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsInputAtom } from './chips-input.atom';

describe('ChipsInputAtom', () => {
  let component: ChipsInputAtom;
  let fixture: ComponentFixture<ChipsInputAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsInputAtom ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsInputAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
