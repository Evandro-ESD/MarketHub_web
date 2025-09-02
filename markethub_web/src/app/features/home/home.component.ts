import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { CarrinhoService } from '../../core/services/carrinho.service';

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
export class HomeComponent {
  // No futuro, estes dados virão de uma chamada de API
  produtos: Produto[] = [
    {
      id: 1,
      titulo: 'Smartphone Modelo X',
      descricao: 'Um smartphone de última geração com a melhor câmera do mercado.',
      preco: 3999.99,
      imageUrl: 'https://picsum.photos/300/200?random=1'
    },
    {
      id: 2,
      titulo: 'Notebook Ultra Fino',
      descricao: 'Leve, potente e ideal para o trabalho e estudos.',
      preco: 7500.00,
      imageUrl: 'https://picsum.photos/300/200?random=2'
    },
    {
      id: 3,
      titulo: 'Fone de Ouvido Sem Fio',
      descricao: 'Cancelamento de ruído ativo e som de alta fidelidade.',
      preco: 899.90,
      imageUrl: 'https://picsum.photos/300/200?random=3'
    },
    {
      id: 4,
      titulo: 'Smartwatch Esportivo',
      descricao: 'Monitore suas atividades físicas com estilo e precisão.',
      preco: 1250.50,
      imageUrl: 'https://picsum.photos/300/200?random=4'
    }
  ];

  constructor(private carrinho: CarrinhoService){}

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