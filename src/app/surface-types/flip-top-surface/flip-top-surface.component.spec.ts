import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipTopSurfaceComponent } from './flip-top-surface.component';

describe('FlipTopSurfaceComponent', () => {
  let component: FlipTopSurfaceComponent;
  let fixture: ComponentFixture<FlipTopSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipTopSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlipTopSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
