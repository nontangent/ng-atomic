import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxColumnMolecule } from './checkbox-column.molecule';

describe('CheckboxColumnMolecule', () => {
  let component: CheckboxColumnMolecule<any>;
  let fixture: ComponentFixture<CheckboxColumnMolecule<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxColumnMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxColumnMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
