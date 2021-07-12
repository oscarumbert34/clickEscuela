import { MatDialogRef } from '@angular/material/dialog';
import { TeacherService } from './../../../../services/teacher.service';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeacherBaseModelComponent } from './teacher-base-model.component';

describe('TeacherBaseModelComponent', () => {
  let component: TeacherBaseModelComponent;
  let fixture: ComponentFixture<TeacherBaseModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[TeacherService],
      declarations: [ TeacherBaseModelComponent ],
      providers:[{provide: MatDialogRef,useValue:{}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherBaseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
