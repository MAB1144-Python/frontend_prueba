import { TestBed } from '@angular/core/testing';

import { BaselineDemoDocumentService } from './baseline-demo-document.service';

describe('BaselineDemoDocumentService', () => {
  let service: BaselineDemoDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaselineDemoDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
