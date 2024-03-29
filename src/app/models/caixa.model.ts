export class Caixa {

    codigo: number;
    tipo: number;
    cor: number;
    altura: number;
    largura: number;
    comprimento: number;
    caixaCodigo: number;
    local: number;
    observacao: string;

}

export class TipoCaixaEntity {
    codigo: number;
    descricao: string;
}


export class CorCaixaEntity {
    codigo: number;
    descricao: string;
}

export class LocalCaixaEntity {
    codigo: number;
    descricao: string;
}