import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagepredictComponent } from './imagepredict.component';

describe('ImagepredictComponent', () => {
  let component: ImagepredictComponent;
  let fixture: ComponentFixture<ImagepredictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagepredictComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagepredictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
