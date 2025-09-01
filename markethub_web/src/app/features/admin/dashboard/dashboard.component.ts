import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../shared/components/card/card.component";
import { ProdutoService } from '../../../core/services/produtos.service';
import { Produtos } from '../../../shared/entities/produtos.entity';

@Component({
  selector: 'app-dashboard',
  imports: [CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // corrigido: styleUrls (plural)
})
export class DashboardComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  listaProdutos: Produtos[] = []; // lista tipada

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        this.listaProdutos = produtos;
        console.log('Produtos carregados:', produtos);
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
      }
    });
  }
}
