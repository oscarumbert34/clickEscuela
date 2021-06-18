import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

constructor(private snackBar: MatSnackBar) { }


showSnackBar(message: string, action: string, type: string) {

  this.snackBar.open(
     message,
     action, {
      duration: 5500,
      panelClass: type.toLowerCase()
    });
  }

  showSnackBarWithoutDuration(message: string, action: string, type: string) {

    this.snackBar.open(
       message,
       action, {
        panelClass: type.toLowerCase()
      });
    }
  }








