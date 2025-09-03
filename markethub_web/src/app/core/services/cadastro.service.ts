import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { User } from '../../shared/entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private apiUrl = environment.apiBaseUrl + environment.endpoints.users; 
  private http = inject(HttpClient);

  // Cadastro de usuário
  cadastrarUsuario(user: User): Observable<any> {
    console.log("NO Cadastro de usuários caminho", this.apiUrl);
    return this.http.post(this.apiUrl, user);
  }
}