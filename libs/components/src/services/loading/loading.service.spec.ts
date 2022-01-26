import { TestBed } from '@angular/core/testing';
import { bufferCount } from 'rxjs/operators';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be loading and end', (done: DoneFn) => {
    service.isLoading$.pipe(bufferCount(2)).subscribe((result: boolean[]) => {
      expect(result).toEqual([true, false]);
      done();
    });

    service.setKey('[TEST] Loading Test Key');
    service.removeKey('[TEST] Loading Test Key');
  });
});
