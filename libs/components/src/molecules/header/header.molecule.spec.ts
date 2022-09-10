import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMolecule } from './header.molecule';

describe('HeaderMolecule', () => {
  let component: HeaderMolecule;
  let fixture: ComponentFixture<HeaderMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
