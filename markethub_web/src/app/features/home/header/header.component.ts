import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { LinkComponent } from "../../../shared/components/link/link.component";
import { User } from './../../../shared/entities/user.entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // se tiver estilos
  ,
  imports: [LinkComponent]
})
export class HeaderComponent implements OnInit {
  user?: User | null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscreve ao BehaviorSubject para atualizar automaticamente
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
    });
  }

  logout() {
    this.authService.logout();
  }
}
