import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReidentificacionVehiculosComponent } from './reidentificacion-vehiculos.component';

describe('ReidentificacionVehiculosComponent', () => {
  let component: ReidentificacionVehiculosComponent;
  let fixture: ComponentFixture<ReidentificacionVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReidentificacionVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReidentificacionVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
