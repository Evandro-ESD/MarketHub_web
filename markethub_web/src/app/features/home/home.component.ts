import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { CardComponent } from '../../shared/components/card/card.component';

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
    HeaderComponent,
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

  aoAdicionarProdutoAoCarrinho(produto: Produto) {
    console.log(`Produto adicionado ao carrinho: ${produto.titulo}`);
    // Aqui você implementaria a lógica para adicionar o item a um serviço de carrinho
  }
}