import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  loading = false;
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    novaSenha: ['', [Validators.required, Validators.minLength(6)]],
  });

  enviar() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    // TODO: integrar endpoint real de recuperação
    setTimeout(() => {
      alert('Senha redefinida (mock). Faça login com a nova senha.');
      this.loading = false;
      this.router.navigate(['/login']);
    }, 1000);
  }
}
