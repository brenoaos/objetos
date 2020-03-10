import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../../../../models/caixa.model';
import { ModalDirective, BsModalService } from 'ngx-bootstrap';
import { ObjetoService } from '../../objeto/objeto.service';
import { IndoorDialog } from '../dialog/indoor/indoor.componente.dialog'

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
    private _servico: CaixaService,
    private readonly _servicoObjeto: ObjetoService,
    private _toastService: ToastrService,
    private _modal: BsModalService
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
      this.caixas.forEach(c => {
        this._servico.getCorByID(c.cor).subscribe(cor => c.cor = cor)
        this._servico.getLocalByID(c.local).subscribe(local => c.local = local)
        this._servico.getTipoByID(c.tipo).subscribe(tipo => c.tipo = tipo)
      })
    });

    this.showSuccess();
  }

  showSuccess() {
    this._toastService.success('Hello world!', 'Toastr fun!');
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

  getCorByID(codigo: number) {
    this._servico.getCorByID(codigo)
      .subscribe(c => this.caixas.forEach((cc) => {

      }));
    return '';
  }

  verItens(codigo) {
    debugger
    let filtro = {
      caixaCodigo: codigo
    };

    this._servico.getItens(filtro).subscribe((d) => {
      let initialState = { itens: d.registros}
      this._modal.show(IndoorDialog, {initialState})
    })
  }

}


