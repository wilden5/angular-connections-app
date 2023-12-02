import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../environment/environment';
import { AuthModule } from './auth/auth.module';
import { MainComponent } from './core/pages/main/main.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: ProjectPages.Empty, component: MainComponent, canActivate: [authGuard] },
  { path: ProjectPages.Auth, loadChildren: () => AuthModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
