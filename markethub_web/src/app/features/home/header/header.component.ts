import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../enviroments/enviroments';
import { AuthService } from '../../../core/services/auth.service';
import { LinkComponent } from '../../../shared/components/link/link.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LinkComponent, ],
  // FallbackImgDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  currentUserNome = computed(() => this.authService.currentUser()?.nome || '');
  currentUserFoto = computed(() => this.authService.currentUser()?.foto || environment.assets.defaultAvatar);

  ngOnInit(): void {
    // Só para debug
    console.log('Nome usuário:', this.currentUserNome());
    console.log('Foto usuário:', this.currentUserFoto());
  }

  logout() {
    this.authService.logout();
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = environment.assets.defaultAvatar;
  }
}
