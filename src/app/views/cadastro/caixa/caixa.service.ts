import { Caixa, CorCaixaEntity } from '../../../models/caixa.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { isString } from 'util';
import { environment } from '../../../../environments/environment';
import { urlApi } from '../../../app.api';

@Injectable()
export class CaixaService {
    url: string = `${urlApi()}/caixas`;

    constructor(private http: HttpClient) {

    }

    getCaixas(filter?: any): Observable<any> {
        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter));

        const response = this.http.get(this.url, { params });
        return response;
    }


    getTipos(filter?: string) {

        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter));

        const response = this.http.get(`${urlApi()}/caixa/tipo`, { params });

        return response;
    }

    getCores(filter?: any) {

        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter));

        const response = this.http.get(`${urlApi()}/caixa/cor`, { params });

        return response;
    }

    getLocais(filter?: any) {

        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter));

        const response = this.http.get(`${urlApi()}/caixa/local`, { params });

        return response;
    }

    getCaixaByID(codigo: number): Observable<any> {
        return this.http.get(this.url + '/' + codigo);
    }

    getCorByID(codigo: number): Observable<any> {
        return this.http.get(`${urlApi()}/caixa/cor/${codigo}`);
    }

    deleteCaixa(codigo: number | string): Observable<any> {
        const params = new HttpParams()
            .set('codigo', `${codigo}`);
        return this.http.delete(this.url + `/${codigo}`, { params });
    }

    salvar(caixa: Caixa) {

        if (caixa.codigo === 0) {
            return this.http.post(this.url, caixa);
        }

        return this.http.patch(this.url, caixa);

    }

}
