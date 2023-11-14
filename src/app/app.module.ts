import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { AppState } from './redux/app.state';
import { youtubeItemsReducer } from './redux/reducers/youtube-items.reducer';
import { customItemsReducer } from './redux/reducers/custom-items.reducer';
import { AppEffects } from './redux/effects/app.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>({ youtubeItems: youtubeItemsReducer, customItems: customItemsReducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
