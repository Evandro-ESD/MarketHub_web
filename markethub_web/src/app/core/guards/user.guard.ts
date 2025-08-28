// import { Injectable, inject } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class UserGuard implements CanActivate {
//   private auth = inject(AuthService);
//   private router = inject(Router);

//   canActivate(): boolean {
//     if (this.auth.isUser() || this.auth.isAdmin()) return true; // ADM também pode acessar USER
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
