import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ConversationRoutingModule } from './conversation-routing.module';
import { DiscussionComponent } from './pages/discussion/discussion.component';

@NgModule({
  declarations: [DiscussionComponent],
  imports: [
    CommonModule,
    ConversationRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class ConversationModule {}
