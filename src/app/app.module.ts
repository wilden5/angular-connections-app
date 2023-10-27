import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { YoutubeModule } from './youtube/youtube.module';

@NgModule({
  declarations: [AppComponent],
  imports: [CoreModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule, YoutubeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
