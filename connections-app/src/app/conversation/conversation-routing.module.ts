import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../../environment/environment';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {
    path: `${ProjectPages.ConversationId}`,
    component: DiscussionComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConversationRoutingModule {}
