import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartIndexTemplate } from './smart-index.template';

describe('SmartIndexTemplate', () => {
  let component: SmartIndexTemplate;
  let fixture: ComponentFixture<SmartIndexTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartIndexTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartIndexTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
