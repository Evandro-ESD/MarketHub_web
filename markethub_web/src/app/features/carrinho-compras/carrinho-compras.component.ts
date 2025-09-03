import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrinhoService } from '../../core/services/carrinho.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments';
import { AlertService } from '../../shared/services/alert.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-carrinho-compras',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinho-compras.component.html',
  styleUrl: './carrinho-compras.component.css'
})
export class CarrinhoComprasComponent {
  loading = signal(false);

  constructor(public carrinho: CarrinhoService, private http: HttpClient, private alerts: AlertService){}

  // getters para acessar signals do serviço sem inicialização prematura
  get itens(){ return this.carrinho.itens; }
  get total(){ return this.carrinho.total; }
  get totalQtd(){ return this.carrinho.totalQuantidade; }

  atualizar(id:number, qtd:number){ this.carrinho.atualizarQuantidade(id, qtd); }
  remover(id:number){ this.carrinho.remover(id); }
  limpar(){ this.carrinho.limpar(); }

  checkout(){
  if(!this.itens().length){ this.alerts.info('Carrinho vazio'); return; }
    if(!confirm('Confirmar pedido?')) return;
    this.loading.set(true);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: token ? `Bearer ${token}`: '' });
  const body = { itens: this.itens().map(i=> ({ id_produto: i.id_produto, quantidade: i.quantidade })) };
    this.http.post(`${environment.apiBaseUrl}/pedidos`, body, { headers }).subscribe({
      next: (res:any)=> { this.alerts.success('Pedido realizado! #'+res.id_pedido); this.carrinho.limpar(); },
      error: err => { console.error(err); this.alerts.error(err.error?.message || 'Erro ao finalizar'); },
      complete: ()=> this.loading.set(false)
    });
  }

}
