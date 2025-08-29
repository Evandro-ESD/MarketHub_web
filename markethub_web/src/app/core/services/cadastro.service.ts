import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl = 'http://localhost:3049/api/users';
  private http = inject(HttpClient);

  // Cadastro de usuário
  cadastrarUsuario(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}
