import { TestBed } from '@angular/core/testing';

import { RecaudoVehiculosService } from './recaudo-vehiculos.service';

describe('RecaudoVehiculosService', () => {
  let service: RecaudoVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecaudoVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
