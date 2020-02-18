import { Objeto } from '../../../models/objeto.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import * as  map from 'rxjs/add/operator/map';
import { query } from '@angular/animations';
import { environment } from '../../../../environments/environment';


@Injectable()
export class ObjetoService {
    url: string = `${environment.url_api}/objetos`;

    constructor(private http: HttpClient) {

    }

    getObjetos(filter?: any): Observable<any> {
        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter));

        const response = this.http.get<Objeto[]>(this.url, { params });
        return response;
    }

    deleteObjeto(codigo: number | string): Observable<any> {
        const params = new HttpParams()
            .set('codigo', `${codigo}`);
        return this.http.delete(this.url + `/${codigo}`, { params });
    }

    salvar(objeto: Objeto) {
        return this.http.post(this.url, objeto);
    }

}
