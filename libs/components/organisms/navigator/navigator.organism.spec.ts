import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorOrganism } from './navigator.organism';

describe('NavigatorOrganism', () => {
  let component: NavigatorOrganism;
  let fixture: ComponentFixture<NavigatorOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigatorOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
