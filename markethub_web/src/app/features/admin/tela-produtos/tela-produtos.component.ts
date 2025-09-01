import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProdutoService } from '../../../core/services/produtos.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-tela-produtos',
  templateUrl: './tela-produtos.component.html',
  styleUrls: ['./tela-produtos.component.css']
})
export class TelaProdutosComponent implements OnInit {
  formProduto!: FormGroup;
  produtos: any[] = [];
  imagemPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.formProduto = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0.01)]],
      estoque: ['', [Validators.required, Validators.min(0)]],
      foto: [null] // campo para arquivo
    });

    this.carregarProdutos();
  }

  // Método para capturar arquivo e gerar preview
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formProduto.patchValue({ foto: file }); // atualiza o FormControl
      const reader = new FileReader();
      reader.onload = () => this.imagemPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // Submissão do formulário
  cadastrarProduto() {
    if (this.formProduto.invalid) return;

    const formData = new FormData();
    Object.keys(this.formProduto.controls).forEach(key => {
      const value = this.formProduto.get(key)?.value;
      if (value !== null) {
        formData.append(key, value);
      }
    });

    this.produtoService.cadastrarProduto(formData).subscribe({
      next: () => {
        alert('Produto cadastrado com sucesso!');
        this.formProduto.reset();
        this.imagemPreview = null;
        this.carregarProdutos();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar produto.');
      }
    });
  }

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (res) => this.produtos = res,
      error: (err) => console.error(err)
    });
  }

  deletarProduto(id: string) {
    this.produtoService.deletarProduto(id).subscribe({
      next: () => this.carregarProdutos(),
      error: (err) => console.error(err)
    });
  }
}
