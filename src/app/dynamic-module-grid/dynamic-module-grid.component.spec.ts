import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicModuleGridComponent } from './dynamic-module-grid.component';

describe('DynamicModuleGridComponent', () => {
  let component: DynamicModuleGridComponent;
  let fixture: ComponentFixture<DynamicModuleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicModuleGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicModuleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
