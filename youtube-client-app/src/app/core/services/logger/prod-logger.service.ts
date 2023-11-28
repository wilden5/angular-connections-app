import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProdLoggerService implements LoggerService {
  logMessage(message: string): void {
    console.log(`[PROD]: ${message}`);
  }
}
