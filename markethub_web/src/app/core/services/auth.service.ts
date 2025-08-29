import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse, User } from '../../shared/entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3049/api/auth';

  // Signal para armazenar usuário logado
  public currentUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // Login
  login(nome: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { nome, senha })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this.currentUser.set({
            nome: res.nome,
            perfil: res.perfil,
            foto: res.foto,
          });
        })
      );
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Retorna token do usuário logado
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
