import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ProdutoService } from '../../../core/services/produtos.service';
import { Produtos } from '../../../shared/entities/produtos.entity';
import { User } from '../../../shared/entities/user.entity';
import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe],
  // imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  meusProdutos: Produtos[] = [];
  isLoading: boolean = false;
  http = inject(HttpClient);
  produtoService = inject(ProdutoService);
  authService = inject(AuthService);
  user?: User | null;

  ngOnInit(): void {
    this.produtoService.getMeusProdutos().subscribe((res) => {
      this.meusProdutos = res;
      this.isLoading = false;
    });

    this.produtoService.carregarMeusProdutos(); // dispara a requisição

    // Subscreve ao BehaviorSubject para atualizar automaticamente
    this.authService.currentUser$.subscribe((u) => {
      this.user = u;
    });
  }
}
