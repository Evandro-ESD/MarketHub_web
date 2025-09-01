import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { Produtos } from '../../shared/entities/produtos.entity';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/produtos`; // removi espaço

  // Criar produto (com imagem)
  createProduto(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }

  // Buscar todos os produtos
  getProdutos(): Observable<Produtos[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });

    return this.http.get<Produtos[]>(this.apiUrl, { headers });
  }
}
