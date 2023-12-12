import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent } from './pages/conversation/conversation.component';

@NgModule({
  declarations: [ConversationComponent],
  imports: [
    CommonModule,
    ConversationRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ConversationModule {}
