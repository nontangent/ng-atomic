import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputFieldMolecule } from './select-input-field.molecule';

describe('SelectInputFieldMolecule', () => {
  let component: SelectInputFieldMolecule;
  let fixture: ComponentFixture<SelectInputFieldMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectInputFieldMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputFieldMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
