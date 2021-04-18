/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AsistanceListComponent } from './asistance-list.component';

describe('AsistanceListComponent', () => {
  let component: AsistanceListComponent;
  let fixture: ComponentFixture<AsistanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsistanceListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
