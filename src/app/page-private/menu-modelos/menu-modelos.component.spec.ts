import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModelosComponent } from './menu-modelos.component';

describe('MenuModelosComponent', () => {
  let component: MenuModelosComponent;
  let fixture: ComponentFixture<MenuModelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuModelosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
