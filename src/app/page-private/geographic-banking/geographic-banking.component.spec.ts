import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicBankingComponent } from './geographic-banking.component';

describe('GeographicBankingComponent', () => {
  let component: GeographicBankingComponent;
  let fixture: ComponentFixture<GeographicBankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeographicBankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeographicBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
