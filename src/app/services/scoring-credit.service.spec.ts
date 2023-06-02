import { TestBed } from '@angular/core/testing';

import { ScoringCreditService } from './scoring-credit.service';

describe('ScoringCreditService', () => {
  let service: ScoringCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoringCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
