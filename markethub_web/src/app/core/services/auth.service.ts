import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { LoginResponse, User } from '../../shared/entities/user.entity';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  private loadUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload: any = JSON.parse(atob(token.split('.')[1]));
        const user: User = {
          id_usuario: payload.id_usuario,
          nome: payload.nome,
          perfil: payload.perfil,
          foto: payload.foto
            ? `${environment.apiBaseUrl}${payload.foto}`
            : environment.assets.defaultAvatar,
          authtoken: token
        };
        this.currentUserSubject.next(user);
      } catch (err) {
        console.warn('Token inválido', err);
        this.logout();
      }
    }
  }

  login(nome: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { nome, senha }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        const user: User = {
          id_usuario: res.id_usuario,
          nome: res.nome,
          perfil: res.perfil,
          foto: res.foto
            ? `${environment.apiBaseUrl}${res.foto}`
            : environment.assets.defaultAvatar,
          authtoken: res.token
        };
        this.currentUserSubject.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateCurrentUser(user: Partial<User>) {
    const current = this.currentUserSubject.value;
    if (current) {
      this.currentUserSubject.next({ ...current, ...user });
    }
  }
}
