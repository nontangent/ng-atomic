import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTableOrganism } from './smart-table.organism';

describe('SmartTableOrganism', () => {
  let component: SmartTableOrganism;
  let fixture: ComponentFixture<SmartTableOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTableOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTableOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
