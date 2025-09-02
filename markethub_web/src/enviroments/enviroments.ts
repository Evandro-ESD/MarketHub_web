// enviroments
export const environment = {
  // caminhos para api:
  // /api/users - referem-se a ususarios
  // /api/auth/login referem-se ao login dos usuários
  // /api/produtos referem-se aos produtos

  production: false,
  apiBaseUrl: 'http://localhost:3049/api', // base da API
   assets: {
    defaultAvatar: '/assets/img/default-avatar.png'
  },
  endpoints: {
    users: '/users',
    login: '/auth/login',
    produtos: '/produtos',
    produtosPorVendedor:'/meus-produtos'
  },
};
