import { TrimesterService } from './../../../../services/trimester.service';
import { ReportCardService } from './../../../../services/reportCard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddReportCardComponent } from './add-report-card.component';

describe('AddReportCardComponent', () => {
  let component: AddReportCardComponent;
  let fixture: ComponentFixture<AddReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportCardComponent ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        ReportCardService,
        TrimesterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    spyOn(component,'closeOnClick').and.callThrough();
    component.closeOnClick();
    expect(component.showTrimester).toEqual(false);
  });
});
