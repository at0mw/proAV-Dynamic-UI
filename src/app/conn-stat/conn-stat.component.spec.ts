import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnStatComponent } from './conn-stat.component';

describe('ConnStatComponent', () => {
  let component: ConnStatComponent;
  let fixture: ComponentFixture<ConnStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
