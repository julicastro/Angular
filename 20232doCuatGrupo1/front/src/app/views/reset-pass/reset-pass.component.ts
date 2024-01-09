import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  passForm: FormGroup;
  submitted: boolean = false;
  recuperacionEnviada: boolean = false; 
  errorRecuperacion: string | null = null;

  constructor(private fb: FormBuilder,private userService: UserService) {
    this.passForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]]
    });
  }

  recuperarContrasena() {
    this.submitted = true;
    this.recuperacionEnviada = false; 
    this.errorRecuperacion = null; 
  
    const usernameControl = this.passForm.get('username');
  
    if (usernameControl) {
      const email = usernameControl.value;
  
      this.userService.recuperarContrasena(email).subscribe(
        (response: any) => {
          console.log('Recuperación exitosa:', response);
          if (response && response.fibase_reset === true){
            this.recuperacionEnviada = true;
          }
          else {
            this.errorRecuperacion = 'Error en el envío de la recuperación, verifica tu mail.';
          }
        }
      )
        
    }
  }

}
