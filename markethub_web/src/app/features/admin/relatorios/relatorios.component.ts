import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendasService } from '../../../core/services/vendas.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { AuthService } from '../../../core/services/auth.service';

interface ResumoVendas {
  totalGeral: number; totalHoje: number; pedidosHoje: number; totalMes: number; totalAno: number;
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit, AfterViewInit {
  private vendas = inject(VendasService);
  private auth = inject(AuthService);
  carregando = true;
  resumo: ResumoVendas | null = null;
  serieDiaria: any[] = [];
  serieMensal: any[] = [];
  serieAnual: any[] = [];
  topProdutos: any[] = [];
  anoAtual = new Date().getFullYear();
  nomeUsuario: string | null = null;

  ngOnInit(): void {
    this.carregar();
    this.auth.currentUser$.subscribe(u => this.nomeUsuario = u?.nome || null);
  }
  ngAfterViewInit(): void { /* charts serão criados após dados */ }

  private tentarRender(){
    if(this.carregando) return;
    setTimeout(()=>{ // garante que canvases existam no DOM
      this.renderCharts();
    },0);
  }

  carregar(){
    this.carregando = true;
    let pendentes = 5;
    const done = ()=>{ pendentes--; if(pendentes===0){ this.carregando = false; this.tentarRender(); } };
    this.vendas.resumo().subscribe(r=>{ this.resumo = r as ResumoVendas; done(); });
    this.vendas.diario(7).subscribe(r=> { this.serieDiaria = r as any[]; done(); });
    this.vendas.mensal(this.anoAtual).subscribe((r:any)=> { this.serieMensal = r.dados; done(); });
    this.vendas.anual(5).subscribe(r=> { this.serieAnual = r as any[]; done(); });
    this.vendas.topProdutos(5).subscribe(r=> { this.topProdutos = r as any[]; done(); });
  }

  private renderCharts(){
    this.renderChart('chartDiario', {
      type: 'bar',
      data: {
        labels: this.serieDiaria.map(d=> new Date(d.dia).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit'})),
        datasets:[{ label:'Total (R$)', data: this.serieDiaria.map(d=> d.total), backgroundColor:'#6a11cb' }]
      },
      options:{ responsive:true, plugins:{ legend:{ display:false } } }
    });

    this.renderChart('chartMensal', {
      type:'line',
      data:{
        labels: this.serieMensal.map(m=> 'M'+m.mes),
        datasets:[{ label:'Total (R$)', data: this.serieMensal.map(m=> m.total), borderColor:'#2575fc', backgroundColor:'rgba(37,117,252,.25)', tension:.3, fill:true }]
      },
      options:{ responsive:true }
    });

    this.renderChart('chartAnual', {
      type:'bar',
      data:{ labels: this.serieAnual.map(a=> a.ano), datasets:[{ label:'Total (R$)', data: this.serieAnual.map(a=> a.total), backgroundColor:'#ff9800' }] },
      options:{ responsive:true }
    });

    this.renderChart('chartTop', {
      type:'doughnut',
      data:{
        labels: this.topProdutos.map(p=> p.nome_produto),
        datasets:[{ data: this.topProdutos.map(p=> p.faturamento), backgroundColor:['#6a11cb','#2575fc','#ff9800','#4caf50','#e91e63'] }]
      },
      options:{ responsive:true, plugins:{ legend:{ position:'bottom' } } }
    });
  }

  private renderChart(id: string, config: ChartConfiguration){
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;
    if(!canvas) return;
    // destruindo chart anterior se re-render
    const existing = Chart.getChart(canvas);
    if(existing) existing.destroy();
    new Chart(canvas.getContext('2d')!, config);
  }
}
