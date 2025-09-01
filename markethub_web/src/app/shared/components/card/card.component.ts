import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // Entradas: Dados que o componente recebe do pai
  @Input() imageUrl: string = 'https://picsum.photos/300/200'; // Imagem padrão
  @Input() titulo: string = 'Nome do Produto';
  @Input() descricao: string = 'Descrição do produto aqui.';
  @Input() preco: number = 0;

  // Saída: Evento que o componente emite para o pai
  @Output() adicionarAoCarrinho = new EventEmitter<void>();

  aoAdicionarAoCarrinho(): void {
    // Quando o botão é clicado, emitimos o evento.
    this.adicionarAoCarrinho.emit();
  }
}
