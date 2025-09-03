export interface Produtos {
    id_produto: number
    nome_produto: string
    descricao: string
    foto?: File | string;
    preco: number
    estoque: number
    id_vendedor: number
}
