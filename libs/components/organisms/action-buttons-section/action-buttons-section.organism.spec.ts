import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsSectionOrganism } from './action-buttons-section.organism';

describe('ActionButtonsSectionOrganism', () => {
  let component: ActionButtonsSectionOrganism;
  let fixture: ComponentFixture<ActionButtonsSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionButtonsSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonsSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
