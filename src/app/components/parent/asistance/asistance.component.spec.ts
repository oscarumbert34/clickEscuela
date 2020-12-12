import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistanceComponent } from './asistance.component';

describe('AsistanceComponent', () => {
  let component: AsistanceComponent;
  let fixture: ComponentFixture<AsistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
