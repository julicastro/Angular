import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;
  errorMessage: string | undefined;
  showPassword = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
  
    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');
    const idUsuarioControl = this.loginForm.get('_id');
  
    if (usernameControl && passwordControl) {
      const email = usernameControl.value;
      const password = passwordControl.value;
  
      this.userService.login({ email, password })
        .subscribe(
          (response: any) => {
            console.log('Inicio de sesión exitoso:', response);
  
            if (response && response.fibase_auth === true) {
              sessionStorage.setItem('isLoggedIn', 'true');
              sessionStorage.setItem('username', email);
              this.router.navigate(['/home']);
            } else {
              console.log('Error de inicio de sesión: Autenticación de Firebase fallida');
              this.errorMessage = 'Error en el inicio de sesión';
            }
          },
          (error: any) => {
            console.log('Error de inicio de sesión:', error);
            if (error && error.code === 'auth/invalid-login-credentials') {
              this.errorMessage = 'Error en el inicio de sesión, verifica tus credenciales.';
            }
          }
        );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  

}
