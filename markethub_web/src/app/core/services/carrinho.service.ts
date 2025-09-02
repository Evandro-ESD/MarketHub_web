import { Injectable, signal, computed } from '@angular/core';
import { Produtos } from '../../shared/entities/produtos.entity';

export interface CartItem {
  id_produto: number;
  nome: string;
  preco: number;
  quantidade: number;
  subtotal: number;
  foto?: string | File;
  estoque?: number;
  id_vendedor?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private storageKey = 'mh_cart_v1';
  private _itens = signal<CartItem[]>(this.carregar());
  itens = this._itens.asReadonly();

  total = computed(()=> this._itens().reduce((s,i)=> s + i.subtotal, 0));
  totalQuantidade = computed(()=> this._itens().reduce((s,i)=> s + i.quantidade, 0));

  private salvar(){ localStorage.setItem(this.storageKey, JSON.stringify(this._itens())); }
  private carregar(): CartItem[]{
    try { return JSON.parse(localStorage.getItem(this.storageKey)||'[]'); } catch { return []; }
  }

  adicionar(prod: Produtos | CartItem, quantidade=1){
    if(quantidade<=0) return;
    this._itens.update(list => {
      const idx = list.findIndex(i=> i.id_produto === (prod as any).id_produto || (prod as any).id);
      const id_produto = (prod as any).id_produto ?? (prod as any).id;
      if(idx>-1){
        const atualizado = { ...list[idx] };
        atualizado.quantidade += quantidade;
        atualizado.subtotal = atualizado.quantidade * atualizado.preco;
        const novo = [...list]; novo[idx]=atualizado; this.salvar(); return novo;
      }
      const item: CartItem = {
        id_produto,
        nome: (prod as any).nome_produto || (prod as any).titulo,
        preco: (prod as any).preco,
        quantidade,
        subtotal: quantidade * (prod as any).preco,
        foto: (prod as any).foto,
        estoque: (prod as any).estoque,
        id_vendedor: (prod as any).id_vendedor
      };
      const novo = [...list, item]; this._itens.set(novo); this.salvar(); return novo;
    });
  }
  remover(id_produto:number){ this._itens.update(list => { const novo = list.filter(i=> i.id_produto!==id_produto); this.salvar(); return novo; }); }
  atualizarQuantidade(id_produto:number, quantidade:number){
    if(quantidade<=0){ this.remover(id_produto); return; }
    this._itens.update(list => { const idx=list.findIndex(i=>i.id_produto===id_produto); if(idx>-1){ const novo=[...list]; novo[idx]={...novo[idx], quantidade, subtotal: quantidade*novo[idx].preco}; this.salvar(); return novo; } return list; });
  }
  limpar(){ this._itens.set([]); this.salvar(); }
}
