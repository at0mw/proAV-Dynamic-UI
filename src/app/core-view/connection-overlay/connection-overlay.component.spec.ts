import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionOverlayComponent } from './connection-overlay.component';

describe('ConnectionOverlayComponent', () => {
  let component: ConnectionOverlayComponent;
  let fixture: ComponentFixture<ConnectionOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
