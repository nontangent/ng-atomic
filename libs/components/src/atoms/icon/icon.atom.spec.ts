import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAtom } from './icon.atom';

describe('IconAtom', () => {
  let component: IconAtom;
  let fixture: ComponentFixture<IconAtom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconAtom ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
