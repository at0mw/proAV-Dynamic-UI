import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdmiSurfaceComponent } from './hdmi-surface.component';

describe('HdmiSurfaceComponent', () => {
  let component: HdmiSurfaceComponent;
  let fixture: ComponentFixture<HdmiSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HdmiSurfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HdmiSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
