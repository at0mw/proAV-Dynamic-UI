import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadeSliderComponent } from './shade-slider.component';

describe('ShadeSliderComponent', () => {
  let component: ShadeSliderComponent;
  let fixture: ComponentFixture<ShadeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadeSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
