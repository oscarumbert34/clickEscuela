import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardChartAdvanceComponent } from './dashboard-chart-advance.component';

describe('DashboardChartAdvanceComponent', () => {
  let component: DashboardChartAdvanceComponent;
  let fixture: ComponentFixture<DashboardChartAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardChartAdvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChartAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
