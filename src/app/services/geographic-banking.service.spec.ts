import { TestBed } from '@angular/core/testing';

import { GeographicBankingService } from './geographic-banking.service';

describe('GeographicBankingService', () => {
  let service: GeographicBankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeographicBankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
