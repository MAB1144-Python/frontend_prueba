import { TestBed } from '@angular/core/testing';

import { ClinicalTaxonomyService } from './clinical-taxonomy.service';

describe('ClinicalTaxonomyService', () => {
  let service: ClinicalTaxonomyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicalTaxonomyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
