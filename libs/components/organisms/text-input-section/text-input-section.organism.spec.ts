import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputSectionOrganism } from './text-input-section.organism';

describe('TextInputSectionOrganism', () => {
  let component: TextInputSectionOrganism;
  let fixture: ComponentFixture<TextInputSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextInputSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
