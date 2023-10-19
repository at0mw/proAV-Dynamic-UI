import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicModuleFlexComponent } from './dynamic-module-flex.component';

describe('DynamicModuleFlexComponent', () => {
  let component: DynamicModuleFlexComponent;
  let fixture: ComponentFixture<DynamicModuleFlexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicModuleFlexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicModuleFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
