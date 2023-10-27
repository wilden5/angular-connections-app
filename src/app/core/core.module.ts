import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { CustomButtonComponent } from '../shared/components/custom-button.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatToolbarModule,
    NgOptimizedImage,
    CustomButtonComponent,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
