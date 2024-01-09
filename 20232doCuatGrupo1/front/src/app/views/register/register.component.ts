import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorRecuperacion: string | null = null;

  constructor(private fb: FormBuilder, private us: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      password: ['', [Validators.required, this.passwordComplexityValidator()]],
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      lastname: [''],
      address: [''],
      telefono: [''],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user = {
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        name: this.registerForm.get('name')?.value,
        lastname: this.registerForm.get('lastname')?.value,
        address: this.registerForm.get('address')?.value,
        telefono: this.registerForm.get('telefono')?.value,
      };
  
      this.us.register(user)
        .subscribe({
          next: (response: any) => {
            if (response && response.insertedId) {
              console.log('Registro exitoso:', response);
              this.router.navigate(['/login']);
            } else if (response && response.error) {
              console.log('Error en el registro:', response.error);
              this.errorRecuperacion = 'Error al registrar el usuario: ' + response.error;
            } else {
              console.log('Respuesta inesperada del servidor:', response);
              this.errorRecuperacion = 'Error inesperado al registrar el usuario.';
            }
          },
          error: (error: any) => {
            console.error('Error en la solicitud HTTP:', error);
            this.errorRecuperacion = 'No se pudo registrar el usuario';
          }
        });
    } else {
      console.log('Formulario inválido. No se realizará el registro.');
      this.errorRecuperacion = 'Falta completar campos.';
    }
  }

  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value;
      
      // Al menos un dígito (\d).
      // Al menos una letra minúscula ([a-z]).
      // Al menos una letra mayúscula ([A-Z]).
      // Al menos un carácter especial de la lista !@#$%^&*()_+.
      // Puede contener cualquier otro carácter alfabético ([a-zA-Z]).
      // Debe tener una longitud mínima de 8 caracteres (.{8,}).

      const complexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/;
  
      if (!complexityRegex.test(password)) {
        return { passwordComplexity: true };
      }
  
      return null;
    };
  }
}
