import { TestBed } from '@angular/core/testing';

import { ReidentificacionVehiculosService } from './reidentificacion-vehiculos.service';

describe('ReidentificacionVehiculosService', () => {
  let service: ReidentificacionVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReidentificacionVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
