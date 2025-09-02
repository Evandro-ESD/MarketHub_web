import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CarrinhoItem {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensSubject = new BehaviorSubject<CarrinhoItem[]>([]);
  itens$ = this.itensSubject.asObservable();

  get itens(): CarrinhoItem[] {
    return this.itensSubject.value;
  }

  adicionar(item: CarrinhoItem) {
    const itens = [...this.itens];
    const existente = itens.find(p => p.id === item.id);

    if (existente) {
      existente.quantidade++;
    } else {
      itens.push({ ...item, quantidade: 1 });
    }

    this.itensSubject.next(itens);
  }

  remover(id: number) {
    const itens = this.itens.filter(p => p.id !== id);
    this.itensSubject.next(itens);
  }

  limpar() {
    this.itensSubject.next([]);
  }
}
