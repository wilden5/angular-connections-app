import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectPages } from '../../environment/environment';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: ProjectPages.Login, component: LoginComponent },
  { path: ProjectPages.Registration, component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
