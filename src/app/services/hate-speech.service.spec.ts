import { TestBed } from '@angular/core/testing';

import { HateSpeechService } from './hate-speech.service';

describe('HateSpeechService', () => {
  let service: HateSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HateSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
