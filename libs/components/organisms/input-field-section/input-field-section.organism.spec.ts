import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldSectionOrganism } from './input-field-section.organism';

describe('InputFieldSectionOrganism', () => {
  let component: InputFieldSectionOrganism;
  let fixture: ComponentFixture<InputFieldSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFieldSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
