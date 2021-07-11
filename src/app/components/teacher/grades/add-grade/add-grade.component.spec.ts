import { HttpClientModule } from '@angular/common/http';
import { studentService } from './../../../../services/student.service';
import { GradesService } from './../../../../services/grades.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddGradeComponent } from './add-grade.component';
import { DecimalPipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddGradeComponent', () => {
  let component: AddGradeComponent;
  let fixture: ComponentFixture<AddGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AddGradeComponent ],
      providers: [
      {
        provide: MatDialogRef,
        useValue: {}
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue:{}
      },
      GradesService,
      studentService,
      DecimalPipe
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
