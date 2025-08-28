import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'USER' | 'ADM';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  constructor(private router: Router) {
    this.loadFromLocalStorage();
  }

  login(user: { email: string; password: string }, token: string, role: UserRole) {
    const loggedUser: User = {
      id: 1,
      name: role === 'ADM' ? 'Administrador' : 'Usuário Comum',
      email: user.email,
      role,
      // avatarUrl: `https://i.pravatar.cc/150?u=${user.email}`,
      avatarUrl: '../../../assets/OIP.png',
      token
    };
    this.currentUserSignal.set(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  }

  logout() {
    this.currentUserSignal.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.currentUserSignal()?.token || null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSignal();
  }

  isAdmin(): boolean {
    return this.currentUserSignal()?.role === 'ADM';
  }

  isUser(): boolean {
    return this.currentUserSignal()?.role === 'USER';
  }

  private loadFromLocalStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.currentUserSignal.set(JSON.parse(stored));
    }
  }
}
