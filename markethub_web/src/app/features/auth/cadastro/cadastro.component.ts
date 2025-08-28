import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  loading = false;

  fb = inject(FormBuilder)

  formCadastro = this.fb.group({
    nome: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    foto: [''],
    perfil: ['']
  })

  cadastrar() {
    this.loading = true;

    // console.log(this.formCadastro.value)



    // Simulação de envio
    setTimeout(() => {
      this.loading = false;
      alert('Usuário cadastrado com sucesso!\n');
      this.limparFormulario();
    }, 2000); // aqui você chamaria seu serviço de cadastro real
  }

  limparFormulario() {
    this.formCadastro.reset();
    this.loading = false;
  }
}
