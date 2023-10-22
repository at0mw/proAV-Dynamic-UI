import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesGridPageComponent } from './devices-grid-page.component';

describe('DevicesGridPageComponent', () => {
  let component: DevicesGridPageComponent;
  let fixture: ComponentFixture<DevicesGridPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesGridPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
