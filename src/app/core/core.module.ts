import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, NgOptimizedImage, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
