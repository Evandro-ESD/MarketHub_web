import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private apiUrl = `${environment.apiBaseUrl}${environment.endpoints.produtos}`;

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cadastrarProduto(produto: FormData): Observable<any> {
    return this.http.post(this.apiUrl, produto);
  }

  deletarProduto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
