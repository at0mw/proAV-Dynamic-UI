import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileDeviceComponent } from './tile-device.component';

describe('TileDeviceComponent', () => {
  let component: TileDeviceComponent;
  let fixture: ComponentFixture<TileDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileDeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
