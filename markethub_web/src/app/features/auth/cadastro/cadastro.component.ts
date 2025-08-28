import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, } from "@angular/forms";

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  fb = inject(FormBuilder)

  formCadastro = this.fb.group({
    nome: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    image: ['']
  })

  loading = false;

  cadastrar() {
    this.loading = true;

    // Simulação de envio
    setTimeout(() => {
      this.loading = false;
      alert('Usuário cadastrado com sucesso!');
      this.limparFormulario();
    }, 2000); // aqui você chamaria seu serviço de cadastro real
  }

  limparFormulario() {
    this.formCadastro.reset();
    this.loading = false;
  }
}
