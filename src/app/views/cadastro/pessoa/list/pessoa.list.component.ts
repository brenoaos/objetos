import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../models/pessoa.model';

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
  public filter = {};
  @ViewChild('searchComponent') searchComponent: string


  constructor(
    private servico: PessoaService
  ) {
  }

  ngOnInit() {

    this.atualizarLista();

  }

  atualizarLista() {
    this.filter = {
      take: this.paginacao,
      skip: this.offset,
      where: {}
    }

    this.servico.getPessoas(this.filter).subscribe((rest) => {
      this.pessoas = rest.registros;
      this.paginas = rest.quantidadeTotal / this.paginacao;
      this.qdeRegistro = rest.quantidadeTotal
    });
  }

  pesquisaPessoa(valor) {

    console.log(valor.value)
  }

  removerPessoa(codigo) {
    this.servico.deletePessoa(codigo)
      .subscribe(() => this.atualizarLista());
  }

  nextPage() {
    debugger;
    if ((this.offset + this.paginacao) < this.qdeRegistro) {
      this.offset = this.offset + this.paginacao;

      this.atualizarLista();
    }

  }

  prevPage() {
    if ((this.offset - this.paginacao) >= 0) {
      this.offset = this.offset - this.paginacao;
      if (this.offset < 0) this.offset = 0;
      this.atualizarLista();
    }
  }


}
