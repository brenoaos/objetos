

export interface Pessoa {   
    codigo: number;
    nome: string;
    sobrenome: string;
    apelido: string;
    sexo: any;
    bloqueado: boolean;
    isZelador: boolean;
    isDono: boolean;
    dataCadastro: Date;
    dataAlteracao: Date;
}