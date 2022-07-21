import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationListOrganism } from './navigation-list.organism';

describe('NavigationListOrganism', () => {
  let component: NavigationListOrganism;
  let fixture: ComponentFixture<NavigationListOrganism>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationListOrganism ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationListOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
