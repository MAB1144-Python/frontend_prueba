import { TestBed } from '@angular/core/testing';

import { ApneaService } from './apnea.service';

describe('ApneaService', () => {
  let service: ApneaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApneaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
