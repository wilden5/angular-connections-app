import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPages } from '../environment/environment';
import { AuthModule } from './auth/auth.module';
import { MainComponent } from './core/pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: ProjectPages.Auth, loadChildren: () => AuthModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
