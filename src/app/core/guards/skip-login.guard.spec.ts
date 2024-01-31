import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { skipLoginGuard } from './skip-login.guard';

describe('skipLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => skipLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
