import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputSectionOrganism } from './select-input-section.organism';

describe('SelectInputSectionOrganism', () => {
  let component: SelectInputSectionOrganism;
  let fixture: ComponentFixture<SelectInputSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectInputSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
