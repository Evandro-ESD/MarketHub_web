import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

// O ideal é que esta interface venha de um arquivo de modelo compartilhado,
// por exemplo: 'src/app/core/models/produto.model.ts'
export interface Produto {
  id: number;
  imageUrl: string;
  titulo: string;
  descricao: string;
  preco: number;
}

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnChanges, OnInit, OnDestroy {
  @Input() produtos: Produto[] = [];
  @Input() limite = 7; // Limite de cards a serem exibidos. Você pode mudar este valor.
  @Output() adicionarAoCarrinho = new EventEmitter<Produto>();

  // Usaremos este array para renderizar, respeitando o limite
  produtosExibidos: Produto[] = [];
  selectedIndex = 0;
  private intervalId?: any;

  ngOnInit(): void {
    this.iniciarRotacaoAutomatica();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produtos'] || changes['limite']) {
      this.produtosExibidos = this.produtos.slice(0, this.limite);
      this.selectedIndex = 0;
      this.reiniciarRotacao();
    }
  }

  ngOnDestroy(): void {
    this.pararRotacaoAutomatica();
  }

  iniciarRotacaoAutomatica(): void {
    this.pararRotacaoAutomatica(); // Garante que não haja múltiplos intervalos
    if (this.produtosExibidos.length > 1) {
      this.intervalId = setInterval(() => {
        this.proximo();
      }, 3000); // 3 segundos
    }
  }

  pararRotacaoAutomatica(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  reiniciarRotacao(): void {
    this.pararRotacaoAutomatica();
    this.iniciarRotacaoAutomatica();
  }

  anterior(): void {
    if (this.produtosExibidos.length === 0) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.produtosExibidos.length) % this.produtosExibidos.length;
    this.reiniciarRotacao();
  }

  proximo(): void {
    if (this.produtosExibidos.length === 0) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.produtosExibidos.length;
    this.reiniciarRotacao();
  }

  onAdicionarAoCarrinho(produto: Produto): void {
    this.adicionarAoCarrinho.emit(produto);
  }
}