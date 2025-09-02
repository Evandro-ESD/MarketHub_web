import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments';
import { of } from 'rxjs';
import { MOCK_RESUMO, MOCK_DIARIO, MOCK_MENSAL, MOCK_ANUAL, MOCK_TOP } from './vendas.mock';

@Injectable({ providedIn: 'root' })
export class VendasService {
  private http = inject(HttpClient);
  private base = `${environment.apiBaseUrl}/vendas`;

  private authHeaders(){
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: token ? `Bearer ${token}` : '' });
  }

  private useMock(){ return environment.useMockVendas; }

  resumo(){
    if (this.useMock()) return of(MOCK_RESUMO);
    return this.http.get(`${this.base}/resumo`, { headers: this.authHeaders() });
  }
  diario(dias=7){
    if (this.useMock()) return of(MOCK_DIARIO);
    return this.http.get(`${this.base}/diario`, { headers: this.authHeaders(), params: new HttpParams().set('dias', dias) });
  }
  mensal(ano: number){
    if (this.useMock()) return of({ ano, dados: MOCK_MENSAL });
    return this.http.get(`${this.base}/mensal`, { headers: this.authHeaders(), params: new HttpParams().set('ano', ano) });
  }
  anual(anos=5){
    if (this.useMock()) return of(MOCK_ANUAL);
    return this.http.get(`${this.base}/anual`, { headers: this.authHeaders(), params: new HttpParams().set('anos', anos) });
  }
  topProdutos(limite=5){
    if (this.useMock()) return of(MOCK_TOP.slice(0, limite));
    return this.http.get(`${this.base}/top-produtos`, { headers: this.authHeaders(), params: new HttpParams().set('limite', limite) });
  }
}