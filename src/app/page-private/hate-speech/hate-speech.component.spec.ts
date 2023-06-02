import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HateSpeechComponent } from './hate-speech.component';

describe('HateSpeechComponent', () => {
  let component: HateSpeechComponent;
  let fixture: ComponentFixture<HateSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HateSpeechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HateSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
