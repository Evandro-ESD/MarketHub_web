import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export type UserRole = 'USER' | 'ADM';

export interface User {
  id: number;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSignal = signal<User | null>(null);
  currentUser = this.currentUserSignal.asReadonly();

  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private router: Router, private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  login(user: { name: string; password: string }) {
    return this.http.post<User>(this.apiUrl, user).pipe(
      tap((loggedUser) => {
        // se backend não mandar avatar, pode definir fixo
        loggedUser.avatarUrl = '../../../assets/OIP.png';

        this.currentUserSignal.set(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
      })
    );
  }

  logout() {
    this.currentUserSignal.set(null);
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
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
