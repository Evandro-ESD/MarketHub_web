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
  private apiUrl = `${environment.apiBaseUrl}${environment.endpoints.produtos}`;

  // BehaviorSubject para armazenar produtos do vendedor logado
  private listaProdutosSubject = new BehaviorSubject<Produtos[]>([]);
  public listaProdutos$ = this.listaProdutosSubject.asObservable();

  // Criar produto
  createProduto(formData: FormData) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });

    return this.http.post(this.apiUrl, formData, { headers });
  }

  // Listar todos os produtos (para vendedor/comprador)
  getAllProdutos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });

    return this.http.get<Produtos[]>(this.apiUrl, { headers }).pipe(
      tap((res) => console.log('RESPOSTA DO GET PRODUTOS: ', res))
    );
  }

  // Carregar produtos do vendedor logado e atualizar BehaviorSubject
  carregarMeusProdutos() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });

    this.http.get<Produtos[]>(`${this.apiUrl}/meus-produtos`, { headers })
      .subscribe({
        next: (res) => this.listaProdutosSubject.next(res),
        error: (err) => console.error('Erro ao carregar produtos:', err),
      });
  }

  // Retornar Observable para components se inscreverem
  getMeusProdutos() {
    return this.listaProdutos$;
  }
}
