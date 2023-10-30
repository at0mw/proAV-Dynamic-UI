import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentViewComponent } from './main-content-view.component';

describe('MainContentViewComponent', () => {
  let component: MainContentViewComponent;
  let fixture: ComponentFixture<MainContentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainContentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
