import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoVehiculosComponent } from './conteo-vehiculos.component';

describe('ConteoVehiculosComponent', () => {
  let component: ConteoVehiculosComponent;
  let fixture: ComponentFixture<ConteoVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteoVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
