import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceCollectionComponent } from './surface-collection.component';

describe('SurfaceCollectionComponent', () => {
  let component: SurfaceCollectionComponent;
  let fixture: ComponentFixture<SurfaceCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurfaceCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurfaceCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
