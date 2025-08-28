import { Routes } from '@angular/router';
import { adminRoutes } from './features/admin/admin.routes';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'MarkettHub',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'admin',
    children: adminRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
