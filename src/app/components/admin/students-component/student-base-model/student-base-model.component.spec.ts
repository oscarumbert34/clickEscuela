/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentBaseModelComponent } from './student-base-model.component';

describe('StudentBaseModelComponent', () => {
  let component: StudentBaseModelComponent;
  let fixture: ComponentFixture<StudentBaseModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentBaseModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBaseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
