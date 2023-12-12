import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../../environment/environment';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: `${ProjectPages.ConversationId}`,
    component: ConversationComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationRoutingModule {}
