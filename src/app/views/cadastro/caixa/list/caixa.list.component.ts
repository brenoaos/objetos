import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { Filter } from '../../../../core/utils'
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-caixa-list',
  templateUrl: './caixa.list.component.html',
  styleUrls: ['./caixa.list.component.scss',]
})
export class CaixaListComponent implements OnInit {

  public caixas: Caixa[] = []
  public paginas: number = 1
  public qdeRegistro: number = 0;
  public paginacao: number = 15;
  public offset: number = 0;
  public filter: any;

  @ViewChild('searchComponent') searchComponent: string;
  @ViewChild('myModal') public myModal: ModalDirective;

  constructor(
    private _servico: CaixaService
  ) {
    this.filter = {
      take: this.paginacao,
      skip: this.offset,
    }

  }

  ngOnInit() {

    this.atualizarLista();

  }

  atualizarLista() {
    this._servico.getCaixas(this.filter).subscribe((rest) => {
      this.caixas = rest.registros;
      this.paginas = rest.quantidadeTotal / this.paginacao;
      this.qdeRegistro = rest.quantidadeTotal;
    });
  }

  pesquisaCaixa(valor) {
    // {"where":{"nome":"Breno"}, "take":1}
    let salvaFiltro = this.filter;
    if (valor.value) {
      this.filter = {
        nome: valor.value
      }
    }
    this.atualizarLista()
    this.filter = salvaFiltro
  }

  removerCaixa(codigo) {
    this._servico.deleteCaixa(codigo)
      .subscribe(() => this.atualizarLista());
  }

  nextPage() {
    if ((this.offset + this.paginacao) < this.qdeRegistro) {
      this.offset = this.offset + this.paginacao;
      this.filter.skip = this.offset
      this.atualizarLista();
    }

  }

  prevPage() {
    if ((this.offset - this.paginacao) >= 0) {
      this.offset = this.offset - this.paginacao;
      if (this.offset < 0) this.offset = 0;
      this.filter.skip = this.offset
      this.atualizarLista();
    }
  }

  getCorByID(codigo:number) {
    this._servico.getCorByID(codigo)
              .subscribe(c => this.caixas.forEach((cc) => {
                
              }));
    return '';
  }

  
}
