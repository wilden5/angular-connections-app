import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { CustomButtonComponent } from '../components/custom-button/custom-button.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatToolbarModule, NgOptimizedImage, CustomButtonComponent, MatIconModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
