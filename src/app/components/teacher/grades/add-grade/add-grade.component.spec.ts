/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { addGradeComponent } from './add-grade.component';

describe('addGradeComponent', () => {
  let component: addGradeComponent;
  let fixture: ComponentFixture<addGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(addGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
