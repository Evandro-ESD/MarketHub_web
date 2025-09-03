import { Routes } from '@angular/router';
import { adminRoutes } from './features/admin/admin.routes';
import { CadastroComponent } from './features/auth/cadastro/cadastro.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RecuperarSenhaComponent } from './features/auth/recuperar-senha/recuperar-senha.component';
import { HomeComponent } from './features/home/home.component';
import { ContactComponent } from './pages/contact/contact/contact.component';
import { CarrinhoComprasComponent } from './features/carrinho-compras/carrinho-compras.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'MarkettHub',
  },
  {
    path: 'carrinho',
    component: CarrinhoComprasComponent,
    title: 'Seu Carrinho'
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
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent,
    title: 'Recuperar Senha'
  },
  {
    path: 'contato',
    component: ContactComponent,
    title: 'Fale Conosco'
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
