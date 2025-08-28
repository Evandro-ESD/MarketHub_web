import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router= inject(Router);

  formLogin = this.fb.group({
    nome: [''],
    password: [''],
  })

  onSubmit() {
    this.auth.login(this.formLogin.value as any).subscribe({
      next: () => {
        this.router.navigate(['/home'])
      }, error: (e) => {
          alert(`Login ou senha inválidos\n Erro: ${e.error.message}`)
      }
    })
  }


}
