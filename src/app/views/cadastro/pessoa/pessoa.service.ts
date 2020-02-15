import { Observable } from 'rxjs';
import { Pessoa } from '../../../models/pessoa.model'

export class PessoaService {
    constructor() {

    }


    getPessoas(): Pessoa[] {
        return [{
            "codigo": 1,
            "nome": "Breno",
            "sobrenome": "Oliveira",
            "apelido": "Breno",
            "sexo": 0,
            "bloqueado": false,
            "isZelador": false,
            "isDono": false,
            "dataCadastro": new Date("2020-01-29T16:27:14.175Z"),
            "dataAlteracao": null
        },
        {
            "codigo": 2,
            "nome": "Fulano",
            "sobrenome": "De Tal",
            "apelido": "Ciclano",
            "sexo": 0,
            "bloqueado": false,
            "isZelador": false,
            "isDono": false,
            "dataCadastro": new Date("2020-01-29T16:27:14.175Z"),
            "dataAlteracao": null
        }]
    }

}