import { Component, OnInit, OnDestroy, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../../../models/pessoa.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa.form.component.html',
  styleUrls: ['./pessoa.form.component.scss']
})
export class PessoaFormComponent implements OnInit {

  pessoa: Pessoa;

  constructor(
    private _service: PessoaService,
    private readonly _router: Router,
    private readonly _activeRouter: ActivatedRoute
  ) { }

  ngOnInit(

  ) {
    this._activeRouter.params.subscribe(params => {
      debugger;
      const codigo = params['id'];
      if (!isNaN(codigo)) {
        this._service.getPessoasByID(codigo).subscribe((p: Pessoa) => {this.pessoa = p});
      }
    });

  }

  salvar(form) {
    this._service.salvar(form.value).subscribe((p: Pessoa) => {
      if (p.codigo) {
        this._router.navigate(['/cadastro/pessoa']);
      }
    });
  }

}
