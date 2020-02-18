import { Pessoa } from '../../../models/pessoa.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PessoaService {
    url: string = `${environment.url_api}/pessoas`;

    constructor(private http: HttpClient) {

    }

    getPessoas(filter?: any): Observable<any> {
        const params = new HttpParams()
            .set('filtro', JSON.stringify(filter));

        const response = this.http.get<Pessoa[]>(this.url, {params});
        return response;
    }

    getPessoasByID(codigo: number) {
        return this.http.get(this.url + '/' + codigo );
    }

    deletePessoa(codigo: number | string): Observable<any> {
        const params = new HttpParams()
            .set('codigo', `${codigo}`);
        return this.http.delete(this.url + `/${codigo}`, { params });
    }

    salvar(pessoa: Pessoa) {
        if (isNaN(pessoa.codigo)) {
            return this.http.post(this.url, pessoa);
        }

        return this.http.patch(this.url, pessoa);

    }

}
