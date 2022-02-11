import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsColumnMolecule } from './actions-column.molecule';

describe('ActionsColumnMolecule', () => {
  let component: ActionsColumnMolecule;
  let fixture: ComponentFixture<ActionsColumnMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsColumnMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsColumnMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
