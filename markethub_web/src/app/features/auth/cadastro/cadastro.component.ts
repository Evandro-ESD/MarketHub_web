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


  onSubmit(cadastro: any, e:Event){
    e.preventDefault()

    console.log("Funciona!!")
    console.log("Valores: ", cadastro)
    
  }
}
