import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../environment/environment';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [{ path: ProjectPages.Auth, loadChildren: () => AuthModule }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
