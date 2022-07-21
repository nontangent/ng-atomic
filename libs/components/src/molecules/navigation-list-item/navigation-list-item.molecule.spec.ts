import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationListItemMolecule } from './navigation-list-item.molecule';

describe('NavigationListItemMolecule', () => {
  let component: NavigationListItemMolecule;
  let fixture: ComponentFixture<NavigationListItemMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationListItemMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationListItemMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
