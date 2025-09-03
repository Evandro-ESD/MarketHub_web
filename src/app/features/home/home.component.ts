import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { ProdutoService } from '../../core/services/produtos.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';

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
        const base = lista.slice(0,5); // já vem ordenado por id desc do backend
        this.produtos = base.map(p => {
          let url = 'assets/img/default-avatar.png';
          if (p.foto && typeof p.foto === 'string') {
            if (p.foto.startsWith('http')) url = p.foto;
            else if (p.foto.startsWith('uploads/')) url = `http://localhost:3049/${p.foto}`;
            else if (!p.foto.includes('/')) url = `http://localhost:3049/uploads/produtos/${p.foto}`;
          }
          return { id: p.id_produto, titulo: p.nome_produto, descricao: p.descricao, preco: p.preco, imageUrl: url };
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

  scrollTopo(){
    if(typeof window !== 'undefined'){
      window.scrollTo({top:0, behavior:'smooth'});
    }
  }
}
