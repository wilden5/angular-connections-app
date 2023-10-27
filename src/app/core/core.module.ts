import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header/header.component';
import { CustomButtonComponent } from '../components/custom-button/custom-button.component';
import { FilterComponent } from './components/header/filter/filter.component';

@NgModule({
  declarations: [HeaderComponent, FilterComponent],
  imports: [CommonModule, MatToolbarModule, NgOptimizedImage, CustomButtonComponent, MatIconModule],
  exports: [HeaderComponent, FilterComponent],
})
export class CoreModule {}
