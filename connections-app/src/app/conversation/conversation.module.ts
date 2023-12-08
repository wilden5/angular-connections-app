import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { ConversationRoutingModule } from './conversation-routing.module';

@NgModule({
  declarations: [ConversationComponent],
  imports: [CommonModule, ConversationRoutingModule],
})
export class ConversationModule {}
