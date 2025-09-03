import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedPerfil = route.data['perfil'] as 'VENDEDOR' | 'COMPRADOR';
  const user = this.authService.getCurrentUser();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedPerfil && user?.perfil !== expectedPerfil) {
      alert('Acesso negado!');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
