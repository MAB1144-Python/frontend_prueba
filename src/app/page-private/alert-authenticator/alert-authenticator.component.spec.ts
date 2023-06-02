import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAuthenticatorComponent } from './alert-authenticator.component';

describe('AlertAuthenticatorComponent', () => {
  let component: AlertAuthenticatorComponent;
  let fixture: ComponentFixture<AlertAuthenticatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertAuthenticatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertAuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
