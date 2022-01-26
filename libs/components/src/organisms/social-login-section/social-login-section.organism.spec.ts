import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLoginSectionOrganism } from './social-login-section.organism';

describe('SocialLoginSectionOrganism', () => {
  let component: SocialLoginSectionOrganism;
  let fixture: ComponentFixture<SocialLoginSectionOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialLoginSectionOrganism ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLoginSectionOrganism);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
