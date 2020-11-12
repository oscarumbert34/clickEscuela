import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVerticalComponent } from './dashboard-vertical.component';

describe('DashboardVerticalComponent', () => {
  let component: DashboardVerticalComponent;
  let fixture: ComponentFixture<DashboardVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
