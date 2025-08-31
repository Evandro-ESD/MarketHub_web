import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginResponse } from '../../../shared/entities/user.entity';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Formulário de login
  loginForm = this.fb.group({
    nome: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;

    const { nome, senha } = this.loginForm.value;

    this.authService.login(nome!, senha!).subscribe({
      next: (res: LoginResponse) => {
        alert('✅ Login realizado com sucesso!');
        console.log('response no login component', res);

        if (res.perfil === 'VENDEDOR') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        alert(err.error?.message || '❌ Erro no login');
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
}
