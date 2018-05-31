import { TestBed, inject } from '@angular/core/testing';

import { AuthOutUserService } from './auth-out-user.service';

describe('AuthOutUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthOutUserService]
    });
  });

  it('should be created', inject([AuthOutUserService], (service: AuthOutUserService) => {
    expect(service).toBeTruthy();
  }));
});
