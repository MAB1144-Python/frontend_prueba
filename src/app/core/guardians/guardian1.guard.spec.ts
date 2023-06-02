import { TestBed } from '@angular/core/testing';

import { Guardian1Guard } from './guardian1.guard';

describe('Guardian1Guard', () => {
  let guard: Guardian1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Guardian1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
