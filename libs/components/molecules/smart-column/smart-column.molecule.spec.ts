import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartColumnMolecule } from './smart-column.molecule';

describe('SmartColumnMolecule', () => {
  let component: SmartColumnMolecule;
  let fixture: ComponentFixture<SmartColumnMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartColumnMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartColumnMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
