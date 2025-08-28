import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { TelaProdutosComponent } from './tela-produtos/tela-produtos.component';

export const adminRoutes: Routes = [
  { path: 'tela-produtos', component: TelaProdutosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'relatorio', component: RelatoriosComponent },
];
