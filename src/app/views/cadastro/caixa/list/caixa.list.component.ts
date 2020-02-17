import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { Filter } from '../../../../core/utils'

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
  @ViewChild('searchComponent') searchComponent: string


  constructor(
    private servico: CaixaService
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

    this.servico.getCaixas(this.filter).subscribe((rest) => {
      this.caixas = rest.registros;
      this.paginas = rest.quantidadeTotal / this.paginacao;
      this.qdeRegistro = rest.quantidadeTotal
    });
  }

  pesquisaCaixa(valor) {
    debugger;
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
    this.servico.deleteCaixa(codigo)
      .subscribe(() => this.atualizarLista());
  }

  nextPage() {
    debugger;
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


}
