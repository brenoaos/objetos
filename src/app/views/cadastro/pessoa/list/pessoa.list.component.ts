import { Component, OnInit, ViewChild, ɵisListLikeIterable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../models/pessoa.model';
import { Filter } from '../../../../core/utils'

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa.list.component.html',
  styleUrls: ['./pessoa.list.component.scss',]
})
export class PessoaListComponent implements OnInit {

  public pessoas: Pessoa[] = []
  public paginas: number = 1
  public qdeRegistro: number = 0;
  public paginacao: number = 15;
  public offset: number = 0;
  public filter: any;
  @ViewChild('searchComponent') searchComponent: string


  constructor(
    private servico: PessoaService
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
    debugger;
    this.servico.getPessoas(this.filter).subscribe((rest) => {
      this.pessoas = rest.registros;
      this.paginas = rest.quantidadeTotal / this.paginacao;
      this.qdeRegistro = rest.quantidadeTotal
    });
  }

  pesquisaPessoa(valor) {
    // {"where":{"nome":"Breno"}, "take":1}
    let salvaFiltro = this.filter;
    if (valor.value) {
      this.filter = {
        like: [
          { nome: valor.value },
          {sobrenome: valor.value}
        ]
      }
      this.atualizarLista()
      this.filter = salvaFiltro
    }
  }

  removerPessoa(codigo) {
    this.servico.deletePessoa(codigo)
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


}
