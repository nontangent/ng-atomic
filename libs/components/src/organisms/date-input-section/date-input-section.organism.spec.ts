import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateInputSectionOrganism } from './date-input-section.organism';

describe('DateInputSectionOrganism', () => {
  let component: DateInputSectionOrganism;
  let fixture: ComponentFixture<DateInputSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateInputSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
