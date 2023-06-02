import { TestBed } from '@angular/core/testing';

import { SentimentAService } from './sentiment-a.service';

describe('SentimentAService', () => {
  let service: SentimentAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
