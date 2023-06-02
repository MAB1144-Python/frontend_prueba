import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringCreditComponent } from './scoring-credit.component';

describe('ScoringCreditComponent', () => {
  let component: ScoringCreditComponent;
  let fixture: ComponentFixture<ScoringCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoringCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoringCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
