import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiInfoOverlayComponent } from './ui-info-overlay.component';

describe('UiInfoOverlayComponent', () => {
  let component: UiInfoOverlayComponent;
  let fixture: ComponentFixture<UiInfoOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiInfoOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiInfoOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
