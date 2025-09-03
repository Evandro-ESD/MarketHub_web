import { Routes } from '@angular/router';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { TelaProdutosComponent } from './tela-produtos/tela-produtos.component';
import { AdminGuard } from '../../core/guards/admin.guard';

export const adminRoutes: Routes = [
  // { path: 'tela-produtos', component: TelaProdutosComponent },
  // { path: 'relatorio', component: RelatoriosComponent}
   { path: 'tela-produtos', component: TelaProdutosComponent, canActivate:[AdminGuard] },
   { path: 'relatorio', component: RelatoriosComponent, canActivate:[AdminGuard]},
];
