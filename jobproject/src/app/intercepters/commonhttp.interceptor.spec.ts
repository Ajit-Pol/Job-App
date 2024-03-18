import { TestBed } from '@angular/core/testing';

import { CommonhttpInterceptor } from './commonhttp.interceptor';

describe('CommonhttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CommonhttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CommonhttpInterceptor = TestBed.inject(CommonhttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
