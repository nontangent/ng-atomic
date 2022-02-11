import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTemplate } from './loading.template';

describe('LoadingTemplate', () => {
  let component: LoadingTemplate;
  let fixture: ComponentFixture<LoadingTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
