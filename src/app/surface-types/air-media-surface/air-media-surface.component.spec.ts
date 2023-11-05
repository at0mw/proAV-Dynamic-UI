import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirMediaSurfaceComponent } from './air-media-surface.component';

describe('AirMediaSurfaceComponent', () => {
  let component: AirMediaSurfaceComponent;
  let fixture: ComponentFixture<AirMediaSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirMediaSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirMediaSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
