import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectOverlayComponent } from './disconnect-overlay.component';

describe('DisconnectOverlayComponent', () => {
  let component: DisconnectOverlayComponent;
  let fixture: ComponentFixture<DisconnectOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisconnectOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
