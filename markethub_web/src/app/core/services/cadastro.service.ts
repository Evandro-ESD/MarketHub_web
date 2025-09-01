import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { User } from '../../shared/entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl = environment.endpoints.produtos;
  private http = inject(HttpClient);

  // Cadastro de usuário
  cadastrarUsuario(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }
}
