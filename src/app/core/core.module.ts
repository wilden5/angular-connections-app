import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { CustomButtonComponent } from '../shared/components/custom-button.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, MainComponent],
  imports: [CommonModule, CustomButtonComponent, NgOptimizedImage, SharedModule, RouterLink],
  exports: [HeaderComponent],
})
export class CoreModule {}
