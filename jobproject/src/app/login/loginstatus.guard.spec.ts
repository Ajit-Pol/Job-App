import { TestBed } from '@angular/core/testing';

import { LoginstatusGuard } from './loginstatus.guard';

describe('LoginstatusGuard', () => {
  let guard: LoginstatusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginstatusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
