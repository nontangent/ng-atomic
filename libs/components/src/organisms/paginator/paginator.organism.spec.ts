import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorOrganism } from './paginator.organism';

describe('PaginatorOrganism', () => {
  let component: PaginatorOrganism;
  let fixture: ComponentFixture<PaginatorOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginatorOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
