import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  apiUrl = 'http://localhost:/3049/api/users'

  constructor() { }

  http = inject(HttpClient)

  cadastrarUsuario(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user)
  }
}
