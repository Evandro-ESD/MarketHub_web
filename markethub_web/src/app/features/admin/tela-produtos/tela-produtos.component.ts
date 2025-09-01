// tela-produtos.component.ts
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

  // Submete formulário
  cadastrarProduto() {
    if (this.formProduto.invalid) return;

    const formData = new FormData();
    Object.keys(this.formProduto.controls).forEach(key => {
      const value = this.formProduto.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    this.produtoService.cadastrarProduto(formData).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.formProduto.reset();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar produto.');
      }
    });
  }
}
