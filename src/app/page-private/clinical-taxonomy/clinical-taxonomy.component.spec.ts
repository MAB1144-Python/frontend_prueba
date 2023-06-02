import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTaxonomyComponent } from './clinical-taxonomy.component';

describe('ClinicalTaxonomyComponent', () => {
  let component: ClinicalTaxonomyComponent;
  let fixture: ComponentFixture<ClinicalTaxonomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicalTaxonomyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalTaxonomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
