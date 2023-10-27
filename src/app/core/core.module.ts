import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatToolbarModule,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    SharedModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
