import { Pessoa } from '../../../models/pessoa.model'
import * as URL_API from '../../../app.api'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';
import  * as  map from 'rxjs/add/operator/map'

@Injectable()
export class PessoaService {
    constructor(private http: HttpClient) {

    }

    getPessoas(): Observable<any> {
        return this.http.get(`${URL_API.urlApi()}/pessoas`);
    }

}