import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCrudTemplate } from './smart-crud.template';

describe('SmartCrudTemplate', () => {
  let component: SmartCrudTemplate;
  let fixture: ComponentFixture<SmartCrudTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartCrudTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCrudTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
