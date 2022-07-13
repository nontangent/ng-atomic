import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaFieldMolecule } from './textarea-field.molecule';

describe('TextareaFieldMolecule', () => {
  let component: TextareaFieldMolecule;
  let fixture: ComponentFixture<TextareaFieldMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaFieldMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaFieldMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
