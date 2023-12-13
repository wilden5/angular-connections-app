import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserEffects } from './redux/effects/user.effects';
import { userReducer } from './redux/reducers/user.reducer';
import { MainComponent } from './core/pages/main/main.component';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { groupReducer } from './redux/reducers/group.reducer';
import { GroupEffects } from './redux/effects/group.effects';
// eslint-disable-next-line max-len
import { ConfirmationModalComponent } from './core/components/confirmation-modal/confirmation-modal.component';
// eslint-disable-next-line max-len
import { CreateGroupModalComponent } from './core/components/create-group-modal/create-group-modal.component';
import { peopleReducer } from './redux/reducers/people.reducer';
import { PeopleEffects } from './redux/effects/people.effects';
import { ConversationEffects } from './redux/effects/conversation.effects';
import { conversationReducer } from './redux/reducers/conversation.reducer';
import { DialogEffects } from './redux/effects/dialog.effects';
import { dialogReducer } from './redux/reducers/dialog.reducer';
import { specificConversationReducer } from './redux/reducers/specificConversation.reducer';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './core/components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ConfirmationModalComponent,
    CreateGroupModalComponent,
    PageNotFoundComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      user: userReducer,
      groupList: groupReducer,
      peopleList: peopleReducer,
      conversationList: conversationReducer,
      dialogList: dialogReducer,
      conversationHistoryList: specificConversationReducer,
    }),
    EffectsModule.forRoot([
      UserEffects,
      GroupEffects,
      PeopleEffects,
      ConversationEffects,
      DialogEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    MatToolbarModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
