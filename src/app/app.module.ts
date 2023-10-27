import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { ColoredBorderDirective } from './directives/colored-border.directive';
import { SortByKeywordPipe } from './pipes/sort-by-keyword.pipe';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchResultsComponent,
    SearchItemComponent,
    LoginComponent,
    RegistrationComponent,
    ColoredBorderDirective,
    SortByKeywordPipe,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    CustomButtonComponent,
  ],
  providers: [SortByKeywordPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
