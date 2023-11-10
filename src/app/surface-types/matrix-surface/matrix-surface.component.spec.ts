import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixSurfaceComponent } from './matrix-surface.component';

describe('MatrixSurfaceComponent', () => {
  let component: MatrixSurfaceComponent;
  let fixture: ComponentFixture<MatrixSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
