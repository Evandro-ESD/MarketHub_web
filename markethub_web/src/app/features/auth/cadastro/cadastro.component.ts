import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from '../../../core/services/cadastro.service';
import { User } from '../../../shared/entities/user.entity';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  loading = false;
  showPassword = false;
  squares = Array.from({ length: 180 });

  private fb = inject(FormBuilder);
  private cadastroService = inject(CadastroService);
  private router = inject(Router);

  formCadastro = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    perfil: ['COMPRADOR', Validators.required],
  });

  cadastrar() {
    if (this.formCadastro.invalid) {
      this.formCadastro.markAllAsTouched();
      return;
    }

    this.loading = true;

    const user: User = this.formCadastro.value as User;

    console.log("USER no cadastro component: ",user)

    this.cadastroService.cadastrarUsuario(user).subscribe({
      next: (response) => {
        alert('✅ Cadastro realizado com sucesso!');
        console.log('response no cadastro component', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error.message || '❌ Erro no cadastro');
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.router.navigate(['/login'])
      },
    });
  }

  limparFormulario() {
    this.formCadastro.reset();
    this.loading = false;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
