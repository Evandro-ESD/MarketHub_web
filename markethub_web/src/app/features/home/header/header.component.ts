import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { LinkComponent } from "../../../shared/components/link/link.component";
import { User } from './../../../shared/entities/user.entity';
import { CarrinhoService, CarrinhoItem } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [LinkComponent]
})
export class HeaderComponent implements OnInit {
  user?: User | null;

  itens: CarrinhoItem[] = [];
  totalItens: number = 0;
  mostrarCarrinho: boolean = false;

  constructor(
    private authService: AuthService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
    });

    this.carrinhoService.itens$.subscribe(itens => {
      this.itens = itens;
      this.totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
    });
  }

  logout() {
    this.authService.logout();
  }
  
  toggleCarrinho() {
    this.mostrarCarrinho = !this.mostrarCarrinho;
  }

  removerDoCarrinho(id: number) {
    this.carrinhoService.remover(id);
  }

  limparCarrinho(): void {
    this.carrinhoService.limpar();
  }
}
