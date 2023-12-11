import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  setSnackBar(customMsg: string): void {
    this.snackBar.open(customMsg, '', {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
