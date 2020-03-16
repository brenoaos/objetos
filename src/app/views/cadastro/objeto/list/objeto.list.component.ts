import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ObjetoService } from '../objeto.service';
import { Objeto } from '../../../../models/objeto.model';
import { Filter } from '../../../../core/utils';
import { PessoaService } from '../../pessoa/pessoa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-objeto-list',
  templateUrl: './objeto.list.component.html',
  styleUrls: ['./objeto.list.component.scss']
})
export class ObjetoListComponent implements OnInit {

  public objetos: Objeto[] = [];
  public paginas: number = 1;
  public qdeRegistro: number = 0;
  public paginacao: number = 15;
  public offset: number = 0;
  public filter: any;
  @ViewChild('searchComponent') searchComponent: string;

  constructor(
    private servico: ObjetoService,
    private pessoaService: PessoaService,
    private readonly _toastService: ToastrService,
  ) {
    this.filter = {
      take: this.paginacao,
      skip: this.offset,
    };

  }

  ngOnInit() {

    this.atualizarLista();

  }

  atualizarLista() {

    this.servico.getObjetos(this.filter).subscribe((rest) => {
      this.objetos = rest.registros;
      this.paginas = rest.quantidadeTotal / this.paginacao;
      this.qdeRegistro = rest.quantidadeTotal;
      this.objetos.forEach(o => {

        o['status'] = (o.caixaCodigo !== 0 ? 'Guardado' : 'Desalocado')
        this.pessoaService.getPessoasByID(o.donoCodigo).subscribe(p => o['dono'] = p);
      })
    }, (err) => {
      this._toastService.error(err.message, 'Erro')
    });
  }

  pesquisaObjeto(valor) {
    // {"where":{"nome":"Breno"}, "take":1}
    const salvaFiltro = this.filter;
    if (valor.value) {
      this.filter = {
        nome: valor.value
      };
    }
    this.atualizarLista();
    this.filter = salvaFiltro;
  }

  removerObjeto(codigo) {
    this.servico.deleteObjeto(codigo)
      .subscribe(() => {
        this.atualizarLista();
        this._toastService.success('Removido com sucesso!');
      }, (err) => {
        this._toastService.error(err.message, 'Erro')
      });
  }

  nextPage() {
    if ((this.offset + this.paginacao) < this.qdeRegistro) {
      this.offset = this.offset + this.paginacao;
      this.filter.skip = this.offset;
      this.atualizarLista();
    }
  }

  prevPage() {
    if ((this.offset - this.paginacao) >= 0) {
      this.offset = this.offset - this.paginacao;
      if (this.offset < 0) this.offset = 0;
      this.filter.skip = this.offset;
      this.atualizarLista();
    }
  }
}
