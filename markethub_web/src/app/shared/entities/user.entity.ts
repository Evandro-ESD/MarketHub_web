// Representa o usuário da aplicação
export interface User {
  id_usuario?: number;  // opcional porque o back gera
  nome: string;
  senha?: string;       // opcional, não trafega no front após login
  perfil: 'VENDEDOR' | 'COMPRADOR';
  foto?: string;        // caminho para a foto
  authtoken?: string;   // token JWT
}

// Resposta do login
export interface LoginResponse {
  token: string;
  perfil: 'VENDEDOR' | 'COMPRADOR';
  nome: string;
  email?: string;  // se o backend mandar
  foto?: string;
}
