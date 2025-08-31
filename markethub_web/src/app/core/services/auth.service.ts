import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { LoginResponse, User } from '../../shared/entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  public currentUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  // Recupera usuário do token armazenado
  private loadUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.currentUser.set({
          nome: decoded.nome,
          perfil: decoded.perfil,
          foto: decoded.foto
            ? `/assets/${decoded.foto}`
            : environment.assets.defaultAvatar,
        });
      } catch (err) {
        console.warn('Token inválido', err);
        this.logout();
      }
    }
  }

  // Login
  login(nome: string, senha: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { nome, senha })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.currentUser.set({
            nome: res.nome,
            perfil: res.perfil,
            foto: res.foto
              ? `/assets/${res.foto}`
              : environment.assets.defaultAvatar,
          });
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
