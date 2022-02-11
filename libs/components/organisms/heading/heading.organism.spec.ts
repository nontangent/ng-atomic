import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingOrganism } from './heading.organism';

describe('HeadingOrganism', () => {
  let component: HeadingOrganism;
  let fixture: ComponentFixture<HeadingOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadingOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadingOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
