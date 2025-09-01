export interface Produtos {
    id_produto: number
    nome_produto: string
    descricao: string
    imagem?: File | string;
    preco: number
    estoque: number
    id_vendedor: number
}
