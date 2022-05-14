import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputSectionOrganism } from './card-input-section.organism';

describe('CardInputSectionOrganism', () => {
  let component: CardInputSectionOrganism;
  let fixture: ComponentFixture<CardInputSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInputSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInputSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
