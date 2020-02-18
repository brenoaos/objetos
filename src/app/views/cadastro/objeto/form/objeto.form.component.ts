import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { ObjetoService } from '../objeto.service';
import { Objeto } from '../../../../models/objeto.model';
import { Router } from '@angular/router';
import { Pessoa } from '../../../../models/pessoa.model';
import { PessoaModule } from '../../pessoa/pessoa.module';
import { PessoaService } from '../../pessoa/pessoa.service';

@Component({
  selector: 'app-objeto-form',
  templateUrl: './objeto.form.component.html',
  styleUrls: ['./objeto.form.component.scss']
})
export class ObjetoFormComponent implements OnInit {
  private pessoas: Pessoa[];

  constructor(
    private _service: ObjetoService,
    private readonly _router: Router,
    private readonly _pessoaService: PessoaService,
  ) { }

  ngOnInit() {
    this.getPessoas();
  }

  salvar(form) {
    this._service.salvar(form.value).subscribe((p: Objeto) => {
      if (p.codigo) {
        this._router.navigate(['/cadastro/objeto']);
      }
    });
  }

  getPessoas(formInput?: any) {

    let filter = {};

    if (formInput) {
      filter = {
        'nome': formInput.value,
        'sobrenome': formInput.value
      };
    }

    this._pessoaService.getPessoas(filter).subscribe((p) => {
      this.pessoas = p.registros;
    });
  }

}
