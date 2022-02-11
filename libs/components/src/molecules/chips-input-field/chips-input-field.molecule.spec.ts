import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsInputFieldMolecule } from './chips-input-field.molecule';

describe('ChipsInputFieldMolecule', () => {
  let component: ChipsInputFieldMolecule;
  let fixture: ComponentFixture<ChipsInputFieldMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsInputFieldMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsInputFieldMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
