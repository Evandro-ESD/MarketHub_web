import { Routes } from '@angular/router';
import { AdminGuard } from '../../core/guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { TelaProdutosComponent } from './tela-produtos/tela-produtos.component';

export const adminRoutes: Routes = [
  { path: 'tela-produtos', component: TelaProdutosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'relatorio', component: RelatoriosComponent}
  // { path: 'tela-produtos', component: TelaProdutosComponent, canActivate:[AdminGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate:[AdminGuard] },
  // { path: 'relatorio', component: RelatoriosComponent, canActivate:[AdminGuard]},
];
