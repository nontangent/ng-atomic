import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputFieldMolecule } from './date-input-field.molecule';

describe('DateInputFieldMolecule', () => {
  let component: DateInputFieldMolecule;
  let fixture: ComponentFixture<DateInputFieldMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateInputFieldMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputFieldMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
