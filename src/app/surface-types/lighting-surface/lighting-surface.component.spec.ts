import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingSurfaceComponent } from './lighting-surface.component';

describe('LightingSurfaceComponent', () => {
  let component: LightingSurfaceComponent;
  let fixture: ComponentFixture<LightingSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightingSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightingSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
