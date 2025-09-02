import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProdutoService } from '../../../core/services/produtos.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-tela-produtos',
  templateUrl: './tela-produtos.component.html',
  styleUrls: ['./tela-produtos.component.css']
})
export class TelaProdutosComponent implements OnInit {
  formProduto!: FormGroup;
  produtos: any[] = [];
  produtoEditando: any = null;
  filtro: string = '';
  loading = false;
  skeletons = Array.from({ length: 6 });
  previewImagem: string | null = null;
  modalAberto = false;

  get produtosFiltrados() {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) return this.produtos;
    return this.produtos.filter(p => (p.nome_produto || '').toLowerCase().includes(termo));
  }

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
  private auth: AuthService,
  private alerts: AlertService
  ) { }

  ngOnInit() {
    // Inicializa o formulário
    this.formProduto = this.fb.group({
      nome_produto: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
      foto: [null],
      id_vendedor: [null]
    });

    // Atualiza id_vendedor quando o usuário logado estiver disponível
    this.auth.currentUser$.subscribe({
      next: (res: any) => {
        this.formProduto.patchValue({ id_vendedor: res?.id_usuario });
      }
    });

    this.carregarProdutos();
  }


  // Captura arquivo do input
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formProduto.patchValue({ foto: file });
      const reader = new FileReader();
      reader.onload = () => this.previewImagem = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  removerImagem() {
    this.formProduto.patchValue({ foto: null });
    this.previewImagem = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  carregarProdutos() {
    this.loading = true;
    this.produtoService.getAllProdutos().subscribe({
      next: (produtos: any[]) => {
        // Ajusta o caminho das imagens
        produtos.forEach(produto => {
          if (!produto.foto) {
            // Exibe uma imagem padrão
            produto.foto = 'path/to/default-image.jpg';
          } else if (typeof produto.foto === 'string' && !produto.foto.startsWith('http')) {
            // Reconstrói o caminho completo
            produto.foto = `http://localhost:3049/uploads/produtos/${produto.foto}`;
          }
        });

        this.produtos = produtos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.loading = false;
      }
    });
  }


  // Envia para o backend (cadastrar ou editar)
  submit() {
    if (this.formProduto.invalid) return;

  // Confirmação antes de prosseguir
  const mensagemConfirmacao = this.produtoEditando ? 'Deseja realmente salvar as alterações deste produto?' : 'Deseja realmente cadastrar este novo produto?';
  const confirmado = confirm(mensagemConfirmacao);
  if (!confirmado) return; // Usuário cancelou

    const formData = new FormData();
    formData.append('nome_produto', this.formProduto.get('nome_produto')?.value);
    formData.append('descricao', this.formProduto.get('descricao')?.value);
    formData.append('preco', this.formProduto.get('preco')?.value);
    formData.append('estoque', this.formProduto.get('estoque')?.value);
    formData.append('id_vendedor', this.formProduto.get('id_vendedor')?.value);

    const fotoCtrlVal = this.formProduto.get('foto')?.value;
    // Se for File anexar; se for string (já existente) não reenviar; se null enviar campo vazio para permitir remoção
    if (fotoCtrlVal instanceof File) {
      formData.append('foto', fotoCtrlVal);
    } else if (fotoCtrlVal === null) {
      formData.append('foto', '');
    }

    if (this.produtoEditando) {
      this.produtoService.updateProduto(this.produtoEditando.id_produto, formData).subscribe({
        next: () => {
          this.carregarProdutos();
          this.alerts.success('Produto atualizado com sucesso!');
          this.fecharModal();
        },
        error: (err) => {
          console.error('Erro ao editar produto:', err);
          this.alerts.error('Erro ao editar produto');
        }
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
        }
      });
    }
  }

  editarProduto(produto: any) {
    this.produtoEditando = produto;
    this.formProduto.patchValue(produto);
    this.previewImagem = produto.foto || null;
    if (!this.modalAberto) {
      this.abrirModal();
    }
  }

  cancelarEdicao() {
    this.produtoEditando = null;
    this.formProduto.reset();
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
    this.previewImagem = null;
  }

  excluirProduto(id: number) {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe({
        next: () => {
          this.carregarProdutos();
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
        }
      });
    }
  }

  trackById(_: number, item: any) { return item.id_produto; }

  abrirModal() {
    this.modalAberto = true;
    setTimeout(() => {
      const first = document.querySelector('.modal input, .modal textarea') as HTMLElement;
      first?.focus();
    }, 50);
  }

  fecharModal() {
    this.modalAberto = false;
    this.cancelarEdicao();
  }

}
