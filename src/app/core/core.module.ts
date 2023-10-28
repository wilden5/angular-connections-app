import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { CustomButtonComponent } from '../shared/components/custom-button.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, CustomButtonComponent, NgOptimizedImage, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
