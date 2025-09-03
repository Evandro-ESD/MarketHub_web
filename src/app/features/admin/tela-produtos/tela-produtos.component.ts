import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProdutoService } from '../../../core/services/produtos.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-tela-produtos',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './tela-produtos.component.html',
  styleUrls: ['./tela-produtos.component.css'],
})
export class TelaProdutosComponent implements OnInit {
  formProduto!: FormGroup;
  meusProdutos: any[] = [];
  produtoEditando: any = null;
  filtro: string = '';
  loading = false;
  skeletons = Array.from({ length: 6 });
  previewImagem: string | null = null;
  modalAberto = false;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private auth: AuthService,
    private alerts: AlertService
  ) {}

  ngOnInit() {
    this.formProduto = this.fb.group({
      nome_produto: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
      foto: [null],
      id_vendedor: [null],
    });

    this.auth.currentUser$.subscribe({
      next: (res: any) =>
        this.formProduto.patchValue({ id_vendedor: res?.id_usuario }),
    });

    this.produtoService.carregarMeusProdutos()

    this.carregarProdutos();
  }

  get produtosFiltrados() {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) return this.meusProdutos;
    return this.meusProdutos.filter((p) =>
      (p.nome_produto || '').toLowerCase().includes(termo)
    );
  }

  carregarProdutos() {
    this.loading = true;
    this.produtoService.carregarMeusProdutos()
    this.produtoService.getMeusProdutos().subscribe({
      next: (produtos: any[]) => {
        this.meusProdutos = produtos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.loading = false;
      },
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formProduto.patchValue({ foto: file });
      const reader = new FileReader();
      reader.onload = () => (this.previewImagem = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removerImagem() {
    this.formProduto.patchValue({ foto: null });
    this.previewImagem = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  submit() {
    if (this.formProduto.invalid) return;

    const confirmado = confirm(
      this.produtoEditando
        ? 'Deseja realmente salvar as alterações deste produto?'
        : 'Deseja realmente cadastrar este novo produto?'
    );
    if (!confirmado) return;

    const formData = new FormData();
    Object.keys(this.formProduto.controls).forEach((key) => {
      if (key !== 'foto')
        formData.append(key, this.formProduto.get(key)?.value);
    });

    const fotoCtrlVal = this.formProduto.get('foto')?.value;
    if (fotoCtrlVal instanceof File) formData.append('foto', fotoCtrlVal);
    else if (fotoCtrlVal === null) formData.append('foto', '');

    if (this.produtoEditando) {
      this.produtoService
        .updateProduto(this.produtoEditando.id_produto, formData)
        .subscribe({
          next: () => {




            this.carregarProdutos();
            this.alerts.success('Produto atualizado com sucesso!');
            this.fecharModal();
          },
          error: (err) => {
            console.log("formData: ", formData)
            console.error('Erro ao editar produto no FRONT:', err);
            this.alerts.error('Erro ao editar produto');
          },
        });
    } else {
      this.produtoService.createProduto(formData).subscribe({
        next: () => {
          this.carregarProdutos();
          this.alerts.success('Produto cadastrado com sucesso!');
          this.fecharModal();
        },
        error: (err) => {
          console.error('Erro ao cadastrar produto!', err);
          this.alerts.error('Erro ao cadastrar produto');
        },
      });
    }
  }

  editarProduto(produto: any) {
    this.produtoEditando = produto;
    this.formProduto.patchValue(produto);
    this.previewImagem = produto.foto || null;
    this.abrirModal();
  }

  cancelarEdicao() {
    this.produtoEditando = null;
    this.formProduto.reset();
    this.previewImagem = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  excluirProduto(id: number) {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe({
        next: () => {
          console.log("IDDDD",id)
          this.carregarProdutos()



        },
        error: (err) => console.error('Erro ao excluir produto:', err),
      });
    }
  }

  abrirModal() {
    this.modalAberto = true;
    setTimeout(() => {
      const first = document.querySelector(
        '.modal input, .modal textarea'
      ) as HTMLElement;
      first?.focus();
    }, 50);
  }

  fecharModal() {
    this.modalAberto = false;
    this.cancelarEdicao();
  }

  trackById(_: number, item: any) {
    return item.id_produto;
  }
}
