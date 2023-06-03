import { TestBed } from '@angular/core/testing';

import { ConteoVehiculosService } from './conteo-vehiculos.service';

describe('ConteoVehiculosService', () => {
  let service: ConteoVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConteoVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
