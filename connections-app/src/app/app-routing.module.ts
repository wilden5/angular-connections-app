import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../environment/environment';
import { AuthModule } from './auth/auth.module';
import { MainComponent } from './core/pages/main/main.component';
import { authGuard } from './core/guards/auth.guard';
import { GroupModule } from './group/group.module';
import { ConversationModule } from './conversation/conversation.module';

const routes: Routes = [
  { path: ProjectPages.Empty, component: MainComponent, canActivate: [authGuard] },
  { path: ProjectPages.Auth, loadChildren: () => AuthModule },
  { path: ProjectPages.Group, loadChildren: () => GroupModule },
  { path: ProjectPages.Conversation, loadChildren: () => ConversationModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
