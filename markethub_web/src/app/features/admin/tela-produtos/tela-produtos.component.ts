import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../../core/services/produtos.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-tela-produtos',
  templateUrl: './tela-produtos.component.html',
  styleUrls: ['./tela-produtos.component.css']
})
export class TelaProdutosComponent implements OnInit {
  formProduto!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // Inicializa o formulário
    this.formProduto = this.fb.group({
      nome_produto: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
      foto: [null],         // Campo de arquivo
      id_vendedor: [null]   // Será preenchido depois
    });

    // Atualiza id_vendedor quando o usuário logado estiver disponível
    this.auth.currentUser$.subscribe({
      next: (res: any) => {
        this.formProduto.patchValue({ id_vendedor: res?.id_usuario });
      }
    });
  }

  // Captura arquivo do input
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formProduto.patchValue({ foto: file });
    }
  }

  // Envia para o backend
  submit() {
  if (this.formProduto.invalid) return;

  const formData = new FormData();
  formData.append('nome_produto', this.formProduto.get('nome_produto')?.value);
  formData.append('descricao', this.formProduto.get('descricao')?.value);
  formData.append('preco', this.formProduto.get('preco')?.value);
  formData.append('estoque', this.formProduto.get('estoque')?.value);

  const foto = this.formProduto.get('foto')?.value;
  if (foto) {
    formData.append('foto', foto);
  }

  this.produtoService.createProduto(formData).subscribe({
    next: (res) => {
      console.log('Produto cadastrado com sucesso!', res);
      this.formProduto.reset();
      alert("produto cadastrado com sucesso!")
    },
    error: (err) => {
      console.error('Erro ao cadastrar produto!', err);
    }
  });
}

}