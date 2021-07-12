import { studentService } from "src/app/services/student.service";
import { GradesService } from "./../../../../services/grades.service";
import { SnackBarService } from "./../../../../services/snack-bar.service";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { GradesListComponent } from "./grades-list.component";

describe("GradesListComponent", () => {
  let component: GradesListComponent;
  let fixture: ComponentFixture<GradesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
      declarations: [GradesListComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        SnackBarService,
        GradesService,
        studentService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
