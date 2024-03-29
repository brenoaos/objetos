import { Caixa, CorCaixaEntity } from '../../../models/caixa.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { urlApi } from '../../../app.api';
import { PessoaService } from '../pessoa/pessoa.service';
import { IndoorDialog } from './dialog/indoor/indoor.componente.dialog'
import { BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CaixaService {
    url: string = `${urlApi()}/caixas`;

    constructor(
        private http: HttpClient,
        private readonly _pessoaService: PessoaService,
        private _modal: BsModalService,
        private readonly _toastyService: ToastrService
        ) {

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

    getLocalByID(codigo: number): Observable<any> {
        return this.http.get(`${urlApi()}/caixa/local/${codigo}`);
    }

    getTipoByID(codigo: number): Observable<any> {
        return this.http.get(`${urlApi()}/caixa/tipo/${codigo}`);
    }

    getItens(filter: any): Observable<any> {
        let params = new HttpParams().set('filtro', JSON.stringify(filter));
        return this.http.get(this.url + '/listar-itens', { params });
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

    verItens(codigo) {
        let filtro = {
            caixaCodigo: codigo
        };
        this.getItens(filtro).subscribe((d) => {
            d.registros.forEach(r => {
                if (r.donoCodigo > 0) {
                    this._pessoaService.getPessoasByID(r.donoCodigo).subscribe((p) => r.donoCodigo = p, err => this._toastyService.error(err.message, "Mapa de pessoa!"))
                }
            });
            let initialState = { itens: d.registros }
            this._modal.show(IndoorDialog, { initialState })
        }, (err) => this._toastyService.error(err.message, 'Erro'))
    }

}
