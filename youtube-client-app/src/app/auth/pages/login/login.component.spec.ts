import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { CustomButtonComponent } from '../../../shared/components/custom-button.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, BrowserAnimationsModule, CustomButtonComponent],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email and password form controls', () => {
    expect(component.loginForm.contains('email')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should require email and password', () => {
    const email = component.loginForm.get('email');
    const password = component.loginForm.get('password');

    email?.setValue('');
    password?.setValue('');

    expect(email?.valid).toBeFalsy();
    expect(password?.valid).toBeFalsy();
  });
});
