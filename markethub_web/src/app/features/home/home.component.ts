import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { ProdutoService } from '../../core/services/produtos.service';

// Interface para garantir a tipagem correta dos seus produtos
interface Produto {
  id: number;
  imageUrl: string;
  titulo: string;
  descricao: string;
  preco: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    CarouselComponent,
    CardComponent,
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // No futuro, estes dados virão de uma chamada de API
  produtos: Produto[] = [];
  carregando = signal(true);

  constructor(private carrinho: CarrinhoService, private produtoService: ProdutoService){}

  ngOnInit(): void {
    this.produtoService.getUltimosProdutos(10).subscribe({
      next: (lista) => {
        // filtrar só com foto e ordenar por id desc (já vem desc) e limitar 5
        const base = lista.filter(p=> !!p.foto).slice(0,5);
        this.produtos = base.map(p => {
          let url = 'assets/img/default-avatar.png';
          if (p.foto && typeof p.foto === 'string') {
            url = p.foto.startsWith('http') ? p.foto : (p.foto.startsWith('uploads/') ? `http://localhost:3049/${p.foto}` : p.foto);
          }
          return {
            id: p.id_produto,
            titulo: p.nome_produto,
            descricao: p.descricao,
            preco: p.preco,
            imageUrl: url
          };
        });
      },
      error: (err) => console.error('Erro carregando últimos produtos', err),
      complete: () => this.carregando.set(false)
    });
  }

  aoAdicionarProdutoAoCarrinho(produto: Produto) {
    const mockProduto = {
      id_produto: produto.id,
      nome_produto: produto.titulo,
      descricao: produto.descricao,
      preco: produto.preco,
      estoque: 999,
      id_vendedor: 0,
      foto: produto.imageUrl
    };
    this.carrinho.adicionar(mockProduto, 1);
  }
}