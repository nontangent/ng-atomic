import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputFieldMolecule } from './text-input-field.molecule';

describe('TextInputFieldMolecule', () => {
  let component: TextInputFieldMolecule;
  let fixture: ComponentFixture<TextInputFieldMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputFieldMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputFieldMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
