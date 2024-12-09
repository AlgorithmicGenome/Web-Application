import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StlouisfedComponent } from './stlouisfed.component';

describe('StlouisfedComponent', () => {
  let component: StlouisfedComponent;
  let fixture: ComponentFixture<StlouisfedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StlouisfedComponent]
    });
    fixture = TestBed.createComponent(StlouisfedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
