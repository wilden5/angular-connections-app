import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProjectPages } from '../../environment/environment';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  { path: ProjectPages.Login, component: LoginComponent, canActivate: [userGuard] },
  { path: ProjectPages.Registration, component: RegistrationComponent, canActivate: [userGuard] },
  { path: ProjectPages.Profile, component: ProfileComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
