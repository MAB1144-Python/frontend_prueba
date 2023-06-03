import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaudoVehiculosComponent } from './recaudo-vehiculos.component';

describe('RecaudoVehiculosComponent', () => {
  let component: RecaudoVehiculosComponent;
  let fixture: ComponentFixture<RecaudoVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaudoVehiculosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecaudoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
