import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaSectionOrganism } from './textarea-section.organism';

describe('TextareaSectionOrganism', () => {
  let component: TextareaSectionOrganism;
  let fixture: ComponentFixture<TextareaSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
