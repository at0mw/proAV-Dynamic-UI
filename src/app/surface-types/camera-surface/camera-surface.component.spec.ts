import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraSurfaceComponent } from './camera-surface.component';

describe('CameraSurfaceComponent', () => {
  let component: CameraSurfaceComponent;
  let fixture: ComponentFixture<CameraSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
