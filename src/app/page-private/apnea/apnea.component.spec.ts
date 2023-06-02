import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApneaComponent } from './apnea.component';

describe('ApneaComponent', () => {
  let component: ApneaComponent;
  let fixture: ComponentFixture<ApneaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApneaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApneaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
