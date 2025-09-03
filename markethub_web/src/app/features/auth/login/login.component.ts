import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AlertService } from '../../../shared/services/alert.service';
import { LoginResponse } from '../../../shared/entities/user.entity';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;
  showPassword = false;
  mode: 'login' | 'signup' = 'login';
  squares = Array.from({ length: 180 });

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alerts = inject(AlertService);

  // Formulário de login
  loginForm = this.fb.group({
    nome: ['', [Validators.required]],
    email: [''], // usado quando signup
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    const { nome, senha } = this.loginForm.value;

    this.authService.login(nome!, senha!).subscribe({
      next: (res: LoginResponse) => {
        this.alerts.success('Login realizado com sucesso!');
        console.log('response no login component', res);

        if (res.perfil === 'VENDEDOR') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.alerts.error(err.error?.message || 'Erro no login');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  limparFormulario() {
    this.loginForm.reset();
    this.loading = false;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  setMode(newMode: 'login' | 'signup') {
    this.mode = newMode;
    if (newMode === 'signup') {
      this.loginForm.get('email')?.addValidators([Validators.required, Validators.email]);
    } else {
      this.loginForm.get('email')?.clearValidators();
      this.loginForm.get('email')?.setValue('');
    }
    this.loginForm.get('email')?.updateValueAndValidity();
  }
}
