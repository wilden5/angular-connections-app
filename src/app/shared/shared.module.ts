import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatSnackBarModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule],
  exports: [MatSnackBarModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule],
})
export class SharedModule {}
