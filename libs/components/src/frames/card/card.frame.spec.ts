import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFrame } from './card.frame';

describe('CardFrame', () => {
  let component: CardFrame;
  let fixture: ComponentFixture<CardFrame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFrame ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFrame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
