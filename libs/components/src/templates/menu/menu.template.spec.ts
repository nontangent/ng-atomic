import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTemplate } from './menu.template';

describe('MenuTemplate', () => {
  let component: MenuTemplate;
  let fixture: ComponentFixture<MenuTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
