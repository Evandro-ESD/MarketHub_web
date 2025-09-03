import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
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
    setTimeout(() => {
      this.enviado = true;
      this.carregando = false;
      this.form.reset();
    }, 1200);
  }
}
