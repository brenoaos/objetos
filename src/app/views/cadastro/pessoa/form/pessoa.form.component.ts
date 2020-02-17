import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../models/pessoa.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  constructor(
    private _service: PessoaService,
    private readonly _router: Router, ) { }

  ngOnInit() { }

  salvar(form) {
    this._service.salvar(form.value).subscribe((p: Pessoa) => {
      if (p.codigo) {
        this._router.navigate(['/cadastro/pessoa']);
      }
    });
  }

}
