import { MatSnackBarModule } from '@angular/material/snack-bar';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { SnackBarService } from './snack-bar.service';

describe('Service: SnackBarService', () => {

  let component: SnackBarService;
  let fixture: ComponentFixture<SnackBarService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [SnackBarService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should ...', inject([SnackBarService], (service: SnackBarService) => {
    expect(service).toBeTruthy();
  }));

  it('Open Snacks bars', () => {
    spyOn(component.snackBar, 'open').and.callThrough();
    component.showSnackBar('Se produjo un error', 'ERROR', 'ERROR');
    expect(component.snackBar.open)
    });



});
