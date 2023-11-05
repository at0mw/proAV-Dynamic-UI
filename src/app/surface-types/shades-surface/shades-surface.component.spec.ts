import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadesSurfaceComponent } from './shades-surface.component';

describe('ShadesSurfaceComponent', () => {
  let component: ShadesSurfaceComponent;
  let fixture: ComponentFixture<ShadesSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShadesSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShadesSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
