import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceSurfaceComponent } from './source-surface.component';

describe('SourceSurfaceComponent', () => {
  let component: SourceSurfaceComponent;
  let fixture: ComponentFixture<SourceSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
