import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../enviroments/enviroments';
import { AuthService } from '../../../core/services/auth.service';
import { LinkComponent } from '../../../shared/components/link/link.component';
import { FallbackImgDirective } from '../../../shared/directives/fallback-img.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LinkComponent, FallbackImgDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  // Computed para pegar nome
  currentUserNome = computed(() => this.authService.currentUser()?.nome || '');
  currentUserFoto = computed(
    () =>
      this.authService.currentUser()?.foto || environment.assets.defaultAvatar
  );

  ngOnInit(): void {
    console.log(this.currentUserNome().length)
    console.log(this.currentUserFoto())
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/default-avatar.png';
  }
}
