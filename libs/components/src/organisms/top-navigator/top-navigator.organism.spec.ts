import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavigatorOrganism } from './top-navigator.organism';

describe('TopNavigatorOrganism', () => {
  let component: TopNavigatorOrganism;
  let fixture: ComponentFixture<TopNavigatorOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopNavigatorOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavigatorOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
