import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroments';
import { Produtos } from '../../shared/entities/produtos.entity';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private http = inject(HttpClient);
  private apiUrl =` ${environment.apiBaseUrl}/produtos`;

  createProduto(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }
}