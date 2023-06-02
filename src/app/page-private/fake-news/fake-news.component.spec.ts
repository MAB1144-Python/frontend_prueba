import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeNewsComponent } from './fake-news.component';

describe('FakeNewsComponent', () => {
  let component: FakeNewsComponent;
  let fixture: ComponentFixture<FakeNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
