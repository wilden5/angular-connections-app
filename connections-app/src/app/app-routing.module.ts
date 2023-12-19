import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../environment/environment';
import { MainComponent } from './core/pages/main/main.component';
import { authGuard } from './auth/guards/auth.guard';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: ProjectPages.Empty, component: MainComponent, canActivate: [authGuard] },
  {
    path: ProjectPages.Auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ProjectPages.Group,
    loadChildren: () => import('./group/group.module').then((m) => m.GroupModule),
  },
  {
    path: ProjectPages.Conversation,
    loadChildren: () =>
      import('./conversation/conversation.module').then((m) => m.ConversationModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
