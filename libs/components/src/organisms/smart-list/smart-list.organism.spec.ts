import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartListOrganism } from './smart-list.organism';

describe('SmartListOrganism', () => {
  let component: SmartListOrganism;
  let fixture: ComponentFixture<SmartListOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartListOrganism ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartListOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
