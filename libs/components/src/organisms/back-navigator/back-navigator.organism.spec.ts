import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackNavigatorOrganism } from './back-navigator.organism';

describe('BackNavigatorOrganism', () => {
  let component: BackNavigatorOrganism;
  let fixture: ComponentFixture<BackNavigatorOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackNavigatorOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackNavigatorOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
