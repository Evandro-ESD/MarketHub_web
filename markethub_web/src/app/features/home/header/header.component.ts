import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { LinkComponent } from "../../../shared/components/link/link.component";
import { User } from './../../../shared/entities/user.entity';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [LinkComponent]
})
export class HeaderComponent implements OnInit {
  user?: User | null;
  menuOpen = signal(false);
  toggleMenu(){ this.menuOpen.set(!this.menuOpen()); }

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
