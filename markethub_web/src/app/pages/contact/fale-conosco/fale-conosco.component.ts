import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Componente legado não mais utilizado. Manter temporariamente apenas para referência.
@Component({
  selector: 'app-fale-conosco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.css']
})
export class FaleConoscoComponent {
  form: FormGroup;
  enviado = false;
  carregando = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', [Validators.required, Validators.minLength(5)]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]],
      concordo: [false, [Validators.requiredTrue]]
    });
  }

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.carregando = true;
    setTimeout(() => { // simulação envio
      this.enviado = true;
      this.carregando = false;
      this.form.reset();
    }, 1200);
  }
}
