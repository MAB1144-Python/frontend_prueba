import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificacionEtiquetasVehiculosComponent } from './identificacion-etiquetas-vehiculos.component';

describe('IdentificacionEtiquetasVehiculosComponent', () => {
  let component: IdentificacionEtiquetasVehiculosComponent;
  let fixture: ComponentFixture<IdentificacionEtiquetasVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentificacionEtiquetasVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentificacionEtiquetasVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
