import { TestBed } from '@angular/core/testing';
import { ChipsManager } from './chips.manager';


describe('ChipsManager', () => {
  let manager: ChipsManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    manager = TestBed.inject(ChipsManager);
  });

  it('should be created', () => {
    expect(manager).toBeTruthy();
  });
});
