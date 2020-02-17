import { Pessoa } from '../../../models/pessoa.model'
import * as URL_API from '../../../app.api'
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import * as  map from 'rxjs/add/operator/map'
import { query } from '@angular/animations';

@Injectable()
export class PessoaService {
    url: string = `${URL_API.urlApi()}/pessoas`;

    constructor(private http: HttpClient) {

    }

    getPessoas(filter?: any): Observable<any> {
        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter))

        let response = this.http.get<Pessoa[]>(this.url, {params})
        return response
    }

    deletePessoa(codigo: number | string): Observable<any> {
        const params = new HttpParams()
            .set('codigo', `${codigo}`)
        return this.http.delete(this.url + `/${codigo}`, { params });
    }

}