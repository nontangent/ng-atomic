import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceTemplate } from './entrance.template';

describe('EntranceTemplate', () => {
  let component: EntranceTemplate;
  let fixture: ComponentFixture<EntranceTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntranceTemplate ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
