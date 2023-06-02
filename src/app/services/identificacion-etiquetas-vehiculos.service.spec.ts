import { TestBed } from '@angular/core/testing';

import { IdentificacionEtiquetasVehiculosService } from './identificacion-etiquetas-vehiculos.service';

describe('IdentificacionEtiquetasVehiculosService', () => {
  let service: IdentificacionEtiquetasVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentificacionEtiquetasVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
