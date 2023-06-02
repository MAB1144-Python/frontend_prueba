import { TestBed } from '@angular/core/testing';

import { LoginServiService } from './login-servi.service';

describe('LoginServiService', () => {
  let service: LoginServiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginServiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
