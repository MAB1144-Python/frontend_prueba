import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentAComponent } from './sentiment-a.component';

describe('SentimentAComponent', () => {
  let component: SentimentAComponent;
  let fixture: ComponentFixture<SentimentAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimentAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentimentAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
