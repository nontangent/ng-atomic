import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOrganism } from './menu.organism';

describe('MenuOrganism', () => {
  let component: MenuOrganism;
  let fixture: ComponentFixture<MenuOrganism>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOrganism ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
