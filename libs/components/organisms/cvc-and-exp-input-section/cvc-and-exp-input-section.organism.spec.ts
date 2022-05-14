import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvcAndExpInputSectionOrganism } from './cvc-and-exp-input-section.organism';

describe('CvcAndExpInputSectionOrganism', () => {
  let component: CvcAndExpInputSectionOrganism;
  let fixture: ComponentFixture<CvcAndExpInputSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvcAndExpInputSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvcAndExpInputSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
