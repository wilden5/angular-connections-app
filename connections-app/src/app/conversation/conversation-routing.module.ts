import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../../environment/environment';
import { ConversationComponent } from './pages/conversation/conversation.component';

const routes: Routes = [
  { path: `${ProjectPages.Empty}`, component: ConversationComponent },
  { path: `${ProjectPages.ConversationId}`, component: ConversationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationRoutingModule {}
