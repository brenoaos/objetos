import { Caixa } from '../../../models/caixa.model'
import * as URL_API from '../../../app.api'
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import * as  map from 'rxjs/add/operator/map'
import { query } from '@angular/animations';

@Injectable()
export class CaixaService {
    url: string = `${URL_API.urlApi()}/caixas`;

    constructor(private http: HttpClient) {

    }

    getCaixas(filter?: any): Observable<any> {
        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter))

        let response = this.http.get<Caixa[]>(this.url, {params})
        return response
    }

    deleteCaixa(codigo: number | string): Observable<any> {
        const params = new HttpParams()
            .set('codigo', `${codigo}`)
        return this.http.delete(this.url + `/${codigo}`, { params });
    }

    salvar(caixa: Caixa) {
        return this.http.post(this.url, caixa);
    }

}