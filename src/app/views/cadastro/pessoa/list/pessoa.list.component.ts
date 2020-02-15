import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../models/pessoa.model';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa.list.component.html',
  styleUrls: ['./pessoa.list.component.scss']
})
export class PessoaListComponent implements OnInit {

  public pessoas: Pessoa[]

  constructor(
    private servico: PessoaService
  ) {
  }

  

  ngOnInit() {
    debugger;
    this.servico.getPessoas().subscribe((rest) => this.pessoas = rest);
  }

  

}
