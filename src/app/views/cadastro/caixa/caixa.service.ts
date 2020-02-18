import { Caixa } from '../../../models/caixa.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { isString } from 'util';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CaixaService {
    url: string = `${environment.url_api}/caixas`;

    constructor(private http: HttpClient) {

    }

    getCaixas(filter?: any): Observable<any> {
        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter));

        const response = this.http.get(this.url, {params});
        return response;
    }

    getCaixaByID(codigo: number): Observable<any> {
        return this.http.get(this.url + '/' + codigo );
    }

    deleteCaixa(codigo: number | string): Observable<any> {
        const params = new HttpParams()
            .set('codigo', `${codigo}`);
        return this.http.delete(this.url + `/${codigo}`, { params });
    }

    salvar(caixa: Caixa) {

        if (isNaN(caixa.codigo) || isString(caixa.codigo)) {
            return this.http.post(this.url, caixa);
        }

        return this.http.patch(this.url, caixa);

    }

}
