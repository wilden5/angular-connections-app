import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [CommonModule, SharedModule],
})
export class AuthModule {}
