import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProdutoService } from '../../../core/services/produtos.service';
import { Produtos } from '../../../shared/entities/produtos.entity';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/entities/user.entity';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private produtoService = inject(ProdutoService);
  private authService = inject(AuthService);

  meusProdutos: Produtos[] = [];
  isLoading = false;
  user: User | null = null;

  ngOnInit(): void {
    // carrega produtos do usuário logado
    this.isLoading = true;
    this.produtoService.getMeusProdutos().subscribe(res => {
      this.meusProdutos = res;
      this.isLoading = false;
    });
    this.produtoService.carregarMeusProdutos();

    this.authService.currentUser$.subscribe(u => this.user = u);
  }
}
