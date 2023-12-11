import { isDevMode, NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { CustomButtonComponent } from '../shared/components/custom-button.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './pages/main/main.component';
import { LoggerService } from './services/logger/logger.service';
import { DevLoggerService } from './services/logger/dev-logger.service';
import { ProdLoggerService } from './services/logger/prod-logger.service';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, MainComponent],
  imports: [CommonModule, CustomButtonComponent, NgOptimizedImage, SharedModule, RouterLink],
  exports: [HeaderComponent],
  providers: [
    {
      provide: LoggerService,
      useClass: isDevMode() ? DevLoggerService : ProdLoggerService,
    },
  ],
})
export class CoreModule {}
